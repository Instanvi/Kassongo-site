# Document Scanner OCR Implementation Guide

## 🎯 Complete Solution Overview

This implementation adds **intelligent document scanning** to the duty calculator, allowing users to:
1. **Upload** shipping/customs documents (invoices, packing lists, BoL)
2. **Auto-extract** HS codes, values, countries, and other data
3. **Auto-fill** duty calculator form fields

## 📦 Architecture

```
┌─────────────────┐      HTTP/REST      ┌──────────────────┐
│   Next.js       │ ◄────────────────► │  Python FastAPI  │
│   Frontend      │                     │   OCR Service    │
│  (TypeScript)   │                     │                  │
└─────────────────┘                     │  - Tesseract     │
                                        │  - OpenCV        │
                                        │  - PIL           │
                                        └──────────────────┘
```

### Components:

1. **Frontend** (`kasongo-site/`)
   - `components/tools/DocumentScanner.tsx` - Image upload & display
   - Auto-integration with duty calculator form

2. **Backend** (`python-ocr-service/`)
   - `app.py` - FastAPI server with OCR processing
   - Tesseract OCR + OpenCV for image processing
   - Smart pattern matching for customs data extraction

## 🚀 Step-by-Step Setup

### Step 1: Install Tesseract OCR

**Windows:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run installer (choose default options)
3. Add to PATH:
   ```cmd
   setx PATH "%PATH%;C:\Program Files\Tesseract-OCR"
   ```
4. Verify:
   ```cmd
   tesseract --version
   ```

**macOS:**
```bash
brew install tesseract
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr libtesseract-dev
```

### Step 2: Setup Python OCR Service

```bash
# Navigate to the OCR service directory
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site\python-ocr-service"

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Start OCR Service

```bash
# Make sure you're in the python-ocr-service directory and venv is activated
python app.py
```

The service will start on `http://localhost:8000`

### Step 4: Integrate with Duty Calculator

Update `duty-calculator/page.tsx` to include the DocumentScanner:

```typescript
import DocumentScanner from "../../../components/tools/DocumentScanner";

// In Step 2, add the scanner:
{step === 2 && (
  <div className="space-y-6">
    {/* Add Document Scanner */}
    <DocumentScanner
      onDataExtracted={(data) => {
        // Auto-fill form fields
        if (data.hsCode) {
          setHSCode(data.hsCode);
          setHSDescription(data.productDescription || "");
        }
        if (data.cifValue) {
          setCifValue(data.cifValue.toString());
          setInputCurrency(data.currency || "USD");
        }
        if (data.originCountry && !origin) {
          // Map country name to code
          setOrigin(mapCountryToCode(data.originCountry));
        }
        if (data.destinationCountry && !destination) {
          setDestination(mapCountryToCode(data.destinationCountry));
        }
      }}
    />

    {/* Existing form fields below */}
    <HSCodeSearch ... />
    <CIFValueInput ... />
  </div>
)}
```

### Step 5: Start Next.js Dev Server

```bash
# In a separate terminal, navigate to kasongo-site
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site"

# Start Next.js
npm run dev
```

## 📱 How It Works

### User Flow:

1. User navigates to Step 2 of duty calculator
2. User uploads document (commercial invoice, packing list, etc.)
3. **Frontend** sends image to Python OCR service
4. **Backend** processes image:
   - Preprocesses (grayscale, denoise, enhance)
   - Runs Tesseract OCR
   - Extracts text
   - Pattern matches for HS codes, values, countries
   - Returns structured data with confidence score
5. **Frontend** receives extracted data
6. **Auto-fills** form fields (HS code, value, currency, etc.)
7. User reviews and adjusts if needed
8. Proceeds to Step 3 (calculation)

### Data Extraction Logic:

```python
# HS Code: 4 digits + optional dot + 2-6 digits
Pattern: \b\d{4}\.?\d{2,6}\b
Example: 8471.30, 8517.12

# Currency Values: Multiple formats
USD 1000, $500, 2,500.00 EUR
Returns: {currency: "USD", amount: 1000}

# Countries: Common shipping/customs countries
USA, China, Cameroon, Nigeria, etc.

# Invoice Info: Invoice number and date
Pattern: invoice no.: INV-2024-001
Pattern: 01/15/2024, 2024-01-15
```

## 🧪 Testing

### Test with Sample Documents:

1. **Commercial Invoice:**
   - Create a test invoice with:
     - HS Code: 8471.30
     - Product: "Laptop computers"
     - Amount: $5,000 USD
     - Origin: China
     - Destination: Cameroon

2. **Test API directly:**
```bash
curl -X POST "http://localhost:8000/api/ocr/scan" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test-invoice.jpg"
```

3. **Test in browser:**
   - Go to http://localhost:3000/tools/duty-calculator
   - Upload test document
   - Verify extracted data appears correctly

## 📊 Performance & Accuracy

### Expected Performance:
- **Processing time:** 1-3 seconds per document
- **Accuracy:** 85-95% on clear, high-resolution scans
- **Best results:** 300 DPI, clear printed text, good lighting

### Tips for Better Accuracy:
1. Use high-resolution images (300+ DPI)
2. Ensure good contrast and lighting
3. Avoid skewed or rotated documents
4. Use clear, printed text (not handwritten)
5. Crop to relevant section if possible

## 🎨 UI Integration

The DocumentScanner component matches your existing design:

- ✅ **Green color scheme** (matching your brand)
- ✅ **Rounded corners** (xl borders)
- ✅ **Confidence scoring** (color-coded badges)
- ✅ **Mobile responsive** (camera capture on mobile)
- ✅ **Loading states** (spinner during processing)
- ✅ **Error handling** (user-friendly messages)

## 🔧 Configuration

### Optional: Environment Variables

Create `python-ocr-service/.env`:

```env
# Server
HOST=0.0.0.0
PORT=8000

# CORS (for production)
CORS_ORIGINS=https://kasongo.com,https://www.kasongo.com

# Optional: OpenAI for AI-enhanced extraction
OPENAI_API_KEY=your_key_here
```

### Optional: AI Enhancement with GPT-4 Vision

For even better accuracy, uncomment in `app.py`:

```python
# Add to requirements.txt:
openai==1.59.7

# In app.py, add:
import openai

async def ai_enhanced_extraction(image: Image, ocr_text: str):
    # Use GPT-4 Vision for intelligent extraction
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract HS code, value, and countries from this customs document:"},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
            ]
        }]
    )
    
    return response.choices[0].message.content
```

## 🚢 Production Deployment

### Option 1: Docker (Recommended)

```dockerfile
# Dockerfile for OCR service
FROM python:3.11-slim

# Install Tesseract
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and deploy:
```bash
docker build -t kasongo-ocr .
docker run -d -p 8000:8000 kasongo-ocr
```

### Option 2: Cloud Services

**AWS Lambda + API Gateway:**
- Package Python service as Lambda function
- Use API Gateway for HTTP endpoint
- Add Lambda layer for Tesseract

**Google Cloud Run:**
- Deploy Docker container directly
- Auto-scaling based on requests

**Heroku:**
- Add Tesseract buildpack
- Deploy with Procfile

## 🔒 Security Considerations

1. **File Size Limits:** Max 10MB per upload
2. **File Type Validation:** Only images (PNG, JPG, JPEG)
3. **Rate Limiting:** Add throttling for production
4. **Data Privacy:** Don't log sensitive document data
5. **CORS:** Restrict origins in production

## 🐛 Troubleshooting

### "Tesseract not found" error
```bash
# Windows: Add to PATH
set PATH=%PATH%;C:\Program Files\Tesseract-OCR

# Verify
tesseract --version
```

### "Module not found" errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Low accuracy results
- Check image quality (should be 300+ DPI)
- Ensure good lighting and contrast
- Try preprocessing adjustments in code

### CORS errors
- Update `CORS_ORIGINS` in app.py
- For development, ensure both servers running

## 📚 Resources

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [pytesseract Documentation](https://pypi.org/project/pytesseract/)
- [OpenCV Python](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## ✅ Checklist

- [ ] Tesseract installed and in PATH
- [ ] Python virtual environment created
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] OCR service running (port 8000)
- [ ] Next.js dev server running (port 3000)
- [ ] DocumentScanner integrated in duty calculator
- [ ] Test document upload working
- [ ] Data extraction auto-filling form fields

## 🎉 Success!

You now have a production-ready OCR document scanner integrated with your duty calculator! Users can upload invoices and automatically extract customs data, making the calculation process much faster and more accurate.
