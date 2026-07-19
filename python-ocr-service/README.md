# Kasongo OCR Service

Python-based OCR service for extracting customs and duty information from shipping documents.

## Features

- 📄 **Document Types Supported:**
  - Commercial Invoices
  - Packing Lists
  - Bill of Lading
  - Customs Declarations

- 🔍 **Extracted Data:**
  - HS Codes (harmonized system codes)
  - Product descriptions
  - CIF values and currencies
  - Origin and destination countries
  - Invoice numbers and dates

- 🚀 **Advanced Processing:**
  - Image preprocessing (grayscale, thresholding, denoising)
  - Tesseract OCR engine
  - Pattern matching and intelligent extraction
  - Confidence scoring

## Installation

### Prerequisites

1. **Install Tesseract OCR:**

   **Windows:**
   ```bash
   # Download from: https://github.com/UB-Mannheim/tesseract/wiki
   # Add to PATH: C:\Program Files\Tesseract-OCR
   ```

   **macOS:**
   ```bash
   brew install tesseract
   ```

   **Linux:**
   ```bash
   sudo apt-get install tesseract-ocr
   ```

2. **Python 3.9+:**
   ```bash
   python --version  # Should be 3.9 or higher
   ```

### Setup

```bash
# Navigate to OCR service directory
cd kasongo-site/python-ocr-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Start the Service

```bash
# Development mode (with auto-reload)
python app.py

# Or using uvicorn directly
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The service will be available at: `http://localhost:8000`

### API Endpoints

#### 1. **Scan Document** (Main endpoint)
```http
POST /api/ocr/scan
Content-Type: multipart/form-data

file: <image_file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hsCode": "8471.30",
    "productDescription": "Laptop computers",
    "cifValue": 5000.00,
    "currency": "USD",
    "originCountry": "China",
    "destinationCountry": "Cameroon",
    "invoiceNumber": "INV-2024-001",
    "invoiceDate": "2024-01-15",
    "rawText": "...",
    "confidence": 0.85,
    "documentType": "Commercial Invoice"
  },
  "processingTime": 1.23
}
```

#### 2. **Health Check**
```http
GET /api/health
```

#### 3. **Service Info**
```http
GET /
```

### Testing with cURL

```bash
# Test document scanning
curl -X POST "http://localhost:8000/api/ocr/scan" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@invoice.jpg"

# Health check
curl http://localhost:8000/api/health
```

## Integration with Next.js Frontend

The frontend component (`DocumentScanner.tsx`) will call this API:

```typescript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('http://localhost:8000/api/ocr/scan', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
```

## Configuration

### Environment Variables (optional)

Create `.env` file:

```env
# Server configuration
HOST=0.0.0.0
PORT=8000

# CORS origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,https://kasongo.com

# Optional: OpenAI for AI-enhanced extraction
OPENAI_API_KEY=your_key_here
```

## Deployment

### Docker (Recommended)

```dockerfile
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

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t kasongo-ocr .
docker run -p 8000:8000 kasongo-ocr
```

### Production Server

Use Gunicorn with Uvicorn workers:

```bash
pip install gunicorn
gunicorn app:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Troubleshooting

### Tesseract Not Found
```
Error: TesseractNotFoundError
```

**Solution:** Ensure Tesseract is installed and in your PATH:
```bash
# Windows: Add to PATH
set PATH=%PATH%;C:\Program Files\Tesseract-OCR

# Verify installation
tesseract --version
```

### Low OCR Accuracy
- Use high-resolution images (300 DPI or higher)
- Ensure good lighting and contrast
- Avoid skewed or rotated documents
- Use clear, printed text (not handwritten)

### Memory Issues
For large images, add:
```python
MAX_IMAGE_SIZE = (2000, 2000)  # Resize before processing
```

## Performance

- **Average processing time:** 1-3 seconds per document
- **Accuracy:** 85-95% on clear, high-quality scans
- **Concurrent requests:** Supports multiple simultaneous uploads

## License

MIT License - See LICENSE file for details
