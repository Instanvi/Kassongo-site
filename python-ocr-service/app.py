# Kasongo OCR Service - Document Scanner for Duty Calculator
# Python FastAPI backend for processing customs/shipping documents

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict
import pytesseract
from PIL import Image
import cv2
import numpy as np
import re
import io
import base64
import shutil
import platform
from datetime import datetime
import fitz  # PyMuPDF for PDF support


def setup_tesseract():
    """Configure tesseract path based on environment"""
    # If tesseract is in PATH, pytesseract finds it automatically
    if shutil.which("tesseract"):
        return  # Linux (Render) and properly-configured Windows
    
    # Windows fallback if not in PATH
    if platform.system() == "Windows":
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    else:
        raise RuntimeError("Tesseract not found. Install it: apt-get install tesseract-ocr")

setup_tesseract()

app = FastAPI(title="Kasongo OCR Service", version="1.0.0")

# CORS configuration for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "https://kassongo-site.vercel.app",  # Production URL
        "https://*.vercel.app",              # All Vercel preview deployments
        "https://kasongo.com",
        "https://*.kasongo.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response models
class ExtractedData(BaseModel):
    hsCode: Optional[str] = None
    productDescription: Optional[str] = None
    cifValue: Optional[float] = None
    currency: Optional[str] = None
    originCountry: Optional[str] = None
    destinationCountry: Optional[str] = None
    invoiceNumber: Optional[str] = None
    invoiceDate: Optional[str] = None
    rawText: str
    confidence: float
    documentType: Optional[str] = None

class OCRResponse(BaseModel):
    success: bool
    data: Optional[ExtractedData]
    error: Optional[str] = None
    processingTime: float


def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Preprocess image for better OCR accuracy
    - Convert to grayscale
    - Apply adaptive thresholding
    - Denoise
    - Enhance contrast
    """
    # Convert PIL to OpenCV format
    img_array = np.array(image)
    
    # Convert to grayscale
    if len(img_array.shape) == 3:
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
    else:
        gray = img_array
    
    # Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )
    
    # Denoise
    denoised = cv2.fastNlMeansDenoising(thresh, None, 10, 7, 21)
    
    # Enhance contrast
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(denoised)
    
    return enhanced


def extract_hs_codes(text: str) -> List[str]:
    """Extract HS codes (6-10 digit format like 8471.30, 8517.12)"""
    # Pattern: 4 digits, optional dot, 2-6 more digits
    pattern = r'\b\d{4}\.?\d{2,6}\b'
    matches = re.findall(pattern, text)
    
    # Filter valid HS codes (usually 6-10 digits)
    hs_codes = [m for m in matches if len(m.replace('.', '')) >= 6]
    return hs_codes


def extract_currency_values(text: str) -> List[Dict[str, any]]:
    """Extract currency amounts (USD 1000, $500, EUR 2,500.00)"""
    patterns = [
        r'(USD|EUR|GBP|CNY|XAF|NGN)\s*[\$€£¥₦]?\s*([\d,]+\.?\d*)',  # USD 1000
        r'[\$€£¥₦]\s*([\d,]+\.?\d*)',  # $1000
        r'([\d,]+\.?\d*)\s*(USD|EUR|GBP|CNY|XAF|NGN)',  # 1000 USD
    ]
    
    values = []
    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                if len(match) == 2:
                    curr, val = match if match[0].isalpha() else (match[1], match[0])
                    try:
                        amount = float(val.replace(',', ''))
                        values.append({'currency': curr.upper(), 'amount': amount})
                    except:
                        pass
    
    return values


def extract_countries(text: str) -> List[str]:
    """Extract country names from common customs document patterns"""
    # Common country names in shipping/customs docs
    countries = [
        'USA', 'United States', 'China', 'Cameroon', 'Nigeria', 'Kenya',
        'South Africa', 'Ghana', 'Germany', 'France', 'United Kingdom', 'UK',
        'Canada', 'Japan', 'India', 'Brazil', 'Mexico', 'Italy', 'Spain'
    ]
    
    found = []
    text_upper = text.upper()
    for country in countries:
        if country.upper() in text_upper:
            found.append(country)
    
    return found


def detect_document_type(text: str) -> Optional[str]:
    """Detect document type based on keywords"""
    text_lower = text.lower()
    
    if any(kw in text_lower for kw in ['commercial invoice', 'invoice number', 'invoice date']):
        return 'Commercial Invoice'
    elif any(kw in text_lower for kw in ['packing list', 'pack list', 'package list']):
        return 'Packing List'
    elif any(kw in text_lower for kw in ['bill of lading', 'b/l', 'bol', 'bl number']):
        return 'Bill of Lading'
    elif any(kw in text_lower for kw in ['customs declaration', 'declaration form']):
        return 'Customs Declaration'
    
    return None


def extract_invoice_info(text: str) -> Dict[str, Optional[str]]:
    """Extract invoice number and date"""
    invoice_number = None
    invoice_date = None
    
    # Invoice number patterns
    inv_patterns = [
        r'invoice\s*(?:number|no\.?|#)\s*:?\s*([A-Z0-9\-]+)',
        r'inv\.?\s*(?:no\.?|#)\s*:?\s*([A-Z0-9\-]+)',
    ]
    
    for pattern in inv_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            invoice_number = match.group(1)
            break
    
    # Date patterns (MM/DD/YYYY, DD-MM-YYYY, etc.)
    date_patterns = [
        r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}',
        r'\d{4}[/-]\d{1,2}[/-]\d{1,2}',
    ]
    
    for pattern in date_patterns:
        match = re.search(pattern, text)
        if match:
            invoice_date = match.group(0)
            break
    
    return {'invoiceNumber': invoice_number, 'invoiceDate': invoice_date}


def smart_extract_data(text: str) -> ExtractedData:
    """
    Intelligent data extraction from OCR text
    Uses pattern matching and contextual analysis
    """
    # Extract components
    hs_codes = extract_hs_codes(text)
    currency_values = extract_currency_values(text)
    countries = extract_countries(text)
    invoice_info = extract_invoice_info(text)
    doc_type = detect_document_type(text)
    
    # Find product description (usually near HS code or after "description:")
    product_desc = None
    desc_pattern = r'(?:description|product|commodity)\s*:?\s*([^\n]{10,100})'
    desc_match = re.search(desc_pattern, text, re.IGNORECASE)
    if desc_match:
        product_desc = desc_match.group(1).strip()
    
    # Determine CIF value (usually the largest amount)
    cif_value = None
    currency = "USD"  # default
    if currency_values:
        largest = max(currency_values, key=lambda x: x['amount'])
        cif_value = largest['amount']
        currency = largest['currency']
    
    # Determine origin/destination (context-based)
    origin = countries[0] if len(countries) > 0 else None
    destination = countries[1] if len(countries) > 1 else None
    
    # Calculate confidence score
    confidence = 0.0
    if hs_codes: confidence += 0.3
    if cif_value: confidence += 0.2
    if product_desc: confidence += 0.2
    if origin or destination: confidence += 0.15
    if invoice_info['invoiceNumber']: confidence += 0.15
    
    return ExtractedData(
        hsCode=hs_codes[0] if hs_codes else None,
        productDescription=product_desc,
        cifValue=cif_value,
        currency=currency,
        originCountry=origin,
        destinationCountry=destination,
        invoiceNumber=invoice_info['invoiceNumber'],
        invoiceDate=invoice_info['invoiceDate'],
        rawText=text,
        confidence=round(confidence, 2),
        documentType=doc_type
    )


@app.post("/api/ocr/scan", response_model=OCRResponse)
async def scan_document(file: UploadFile = File(...)):
    """
    Process uploaded document image and extract customs/duty data
    
    Supports: PNG, JPG, JPEG, PDF (first page)
    Returns: Extracted HS codes, values, countries, etc.
    """
    start_time = datetime.now()
    
    try:
        # Validate file type
        if not (file.content_type.startswith('image/') or file.content_type == 'application/pdf'):
            raise HTTPException(400, "Only image files and PDFs are supported")
        
        # Read file
        contents = await file.read()
        
        # Handle PDF conversion
        if file.content_type == 'application/pdf':
            # Convert first page of PDF to image
            pdf_document = fitz.open(stream=contents, filetype="pdf")
            first_page = pdf_document[0]
            pix = first_page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x zoom for better quality
            img_data = pix.tobytes("png")
            image = Image.open(io.BytesIO(img_data))
            pdf_document.close()
        else:
            image = Image.open(io.BytesIO(contents))
        
        # Preprocess for better OCR
        processed = preprocess_image(image)
        
        # Perform OCR with Tesseract
        # Config: Page segmentation mode 1 (auto with OSD), preserve whitespace
        custom_config = r'--oem 3 --psm 1'
        text = pytesseract.image_to_string(processed, config=custom_config)
        
        # Extract structured data
        extracted_data = smart_extract_data(text)
        
        # Calculate processing time
        processing_time = (datetime.now() - start_time).total_seconds()
        
        return OCRResponse(
            success=True,
            data=extracted_data,
            processingTime=round(processing_time, 2)
        )
        
    except Exception as e:
        processing_time = (datetime.now() - start_time).total_seconds()
        return OCRResponse(
            success=False,
            data=None,
            error=str(e),
            processingTime=round(processing_time, 2)
        )


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Kasongo OCR Service",
        "version": "1.0.0",
        "tesseract_available": True
    }


@app.get("/")
async def root():
    """Root endpoint with service info"""
    return {
        "service": "Kasongo OCR Service",
        "description": "Document scanning for customs duty calculator",
        "endpoints": {
            "scan": "POST /api/ocr/scan",
            "health": "GET /api/health"
        },
        "supported_documents": [
            "Commercial Invoice",
            "Packing List",
            "Bill of Lading",
            "Customs Declaration"
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
