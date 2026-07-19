# 🚀 Document Scanner OCR - Complete Setup Guide

## ✅ What's Been Fixed:

1. ✅ **PDF Support** - Upload PDF invoices/packing lists (PyMuPDF integration)
2. ✅ **Better Mobile Support** - Camera capture works on all devices
3. ✅ **Improved UX/UI** - Modern, responsive design with proper feedback
4. ✅ **Better Error Messages** - Clear feedback when API is down
5. ✅ **File Type Validation** - Supports JPG, PNG, WebP, PDF
6. ✅ **File Size Limit** - 10MB max for performance
7. ✅ **Fixed Python Reload Issue** - Using string format for uvicorn
8. ✅ **Always Show Camera Option** - Browser handles availability

---

## 🎯 Step 1: Install Python Dependencies

```bash
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site\python-ocr-service"

# Activate virtual environment
venv\Scripts\activate

# Install updated dependencies (includes PyMuPDF for PDF support)
pip install -r requirements.txt
```

**Dependencies installed:**
- FastAPI 0.115.6
- Uvicorn 0.34.0
- Pytesseract 0.3.13
- Pillow 11.1.0
- OpenCV-Python 4.10.0.84
- NumPy 2.2.3
- **PyMuPDF 1.25.2** (NEW - for PDF support)

---

## 🎯 Step 2: Install Tesseract OCR

**Windows Installation:**

1. Download Tesseract: https://github.com/UB-Mannheim/tesseract/wiki
2. Run the installer (choose default installation path)
3. Add to PATH:
   ```cmd
   setx PATH "%PATH%;C:\Program Files\Tesseract-OCR"
   ```
4. Verify installation:
   ```bash
   tesseract --version
   ```

You should see:
```
tesseract 5.x.x
```

---

## 🎯 Step 3: Start Python OCR Service

```bash
# Still in python-ocr-service directory with venv activated
python app.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**✅ Test the API:**
```bash
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "Kasongo OCR Service",
  "version": "1.0.0",
  "tesseract_available": true
}
```

---

## 🎯 Step 4: Configure Next.js Frontend

```bash
# In a NEW terminal (keep Python service running)
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site"

# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local if needed (default is fine for local dev)
notepad .env.local
```

**.env.local contents:**
```env
NEXT_PUBLIC_OCR_API_URL=http://localhost:8000
```

---

## 🎯 Step 5: Start Next.js Development Server

```bash
# Still in kasongo-site directory
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 🎯 Step 6: Test the Document Scanner

### Desktop Testing:

1. **Navigate to:** http://localhost:3000/tools/duty-calculator
2. **Click "Upload Document"**
3. **Select a test document:**
   - Commercial invoice (PDF or image)
   - Packing list
   - Any document with HS codes and values
4. **Wait for processing** (2-5 seconds)
5. **Verify extracted data** appears in the form

### Mobile Testing:

1. **Find your local IP:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Open on phone:** http://YOUR_IP:3000/tools/duty-calculator

3. **Click "Take Photo"**

4. **Capture document with camera**

5. **Verify OCR works**

---

## 📱 Supported File Types:

| Type | Extensions | Max Size | Notes |
|------|-----------|----------|-------|
| Images | JPG, PNG, WebP | 10MB | Best for photos |
| Documents | PDF | 10MB | First page only |

**Camera Support:**
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Desktop (if webcam available)
- Browser automatically shows/hides camera option

---

## 🐛 Troubleshooting

### Issue 1: "Failed to fetch" error

**Symptoms:** Frontend shows "Failed to fetch" after uploading document

**Causes:**
- Python API not running
- Wrong API URL in .env.local
- CORS issue

**Fix:**
1. Check Python service is running:
   ```bash
   curl http://localhost:8000/api/health
   ```

2. If it fails, restart Python service:
   ```bash
   cd python-ocr-service
   venv\Scripts\activate
   python app.py
   ```

3. Verify .env.local has correct URL:
   ```
   NEXT_PUBLIC_OCR_API_URL=http://localhost:8000
   ```

4. Restart Next.js dev server after changing .env.local

---

### Issue 2: Python "WARNING: You must pass the application as an import string"

**Symptoms:** Warning when starting Python service (but it still works)

**Status:** ✅ FIXED - Now using `uvicorn.run("app:app", ...)` format

**If you still see it:**
- Make sure you pulled the latest app.py changes
- Restart the Python service

---

### Issue 3: Tesseract not found

**Symptoms:** 
```
pytesseract.pytesseract.TesseractNotFoundError
```

**Fix:**
1. Install Tesseract: https://github.com/UB-Mannheim/tesseract/wiki
2. Add to PATH:
   ```cmd
   setx PATH "%PATH%;C:\Program Files\Tesseract-OCR"
   ```
3. Restart terminal/command prompt
4. Verify:
   ```bash
   tesseract --version
   ```

---

### Issue 4: PDF not processing

**Symptoms:** Error when uploading PDF files

**Causes:**
- PyMuPDF not installed

**Fix:**
```bash
pip install PyMuPDF==1.25.2
```

---

### Issue 5: Poor OCR accuracy

**Solutions:**
- ✅ Use high-resolution scans (300+ DPI)
- ✅ Ensure good lighting when using camera
- ✅ Avoid skewed or rotated documents
- ✅ Use clear, printed text (not handwritten)
- ✅ Ensure document is in focus
- ✅ Avoid shadows and glare

**Example of good document:**
- Straight alignment
- High contrast
- Clear text
- No shadows

---

### Issue 6: Camera not showing on desktop

**Status:** ✅ FIXED - Camera option now always visible

**Behavior:**
- Desktop: Shows "Use Camera" (browser will prompt for webcam if available)
- Mobile: Shows "Take Photo" (automatically uses device camera)

---

### Issue 7: Mobile upload not working

**Causes:**
- Need to access via IP (not localhost)
- Mixed content (HTTP on HTTPS site)

**Fix:**
1. Find your computer's local IP
2. Access from phone using: http://YOUR_IP:3000
3. Make sure phone is on same WiFi network

---

## 🚀 Deploy to Production

### Option 1: Render.com (FREE)

**Python API:**
1. Push code to GitHub
2. Go to Render.com → New → Web Service
3. Connect GitHub repo
4. Configure:
   - **Build Command:** `cd python-ocr-service && pip install -r requirements.txt && apt-get install -y tesseract-ocr`
   - **Start Command:** `cd python-ocr-service && python app.py`
   - **Environment:** Python 3.11
5. Add environment variable:
   - `TESSERACT_CMD=/usr/bin/tesseract`
6. Deploy

**Frontend:**
- Already on Vercel (https://kassongo-site.vercel.app)
- Update environment variable:
  - `NEXT_PUBLIC_OCR_API_URL=https://your-api-name.onrender.com`

---

### Option 2: Railway.app (FREE tier available)

**Similar to Render** with easier setup:
1. Connect GitHub
2. Deploy python-ocr-service folder
3. Railway auto-detects Python
4. Add Tesseract buildpack

---

### Option 3: Docker (Self-hosted)

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

# Install Tesseract
RUN apt-get update && apt-get install -y tesseract-ocr

# Copy code
WORKDIR /app
COPY python-ocr-service/requirements.txt .
RUN pip install -r requirements.txt

COPY python-ocr-service/ .

# Run
CMD ["python", "app.py"]
```

**Deploy:**
```bash
docker build -t kasongo-ocr .
docker run -p 8000:8000 kasongo-ocr
```

---

## 📊 Expected Accuracy

| Document Type | Expected Accuracy | Notes |
|--------------|------------------|-------|
| Clean Invoice | 85-95% | Best results |
| Scanned Document | 70-85% | Depends on scan quality |
| Photo of Document | 60-80% | Lighting affects accuracy |
| Handwritten | 20-40% | Not recommended |

**Confidence Scores:**
- 🟢 80%+ = High confidence (green)
- 🟡 60-79% = Medium confidence (yellow)
- 🔴 <60% = Low confidence (red)

---

## 🔍 What Gets Extracted?

The OCR service looks for:

✅ **HS Codes** (6-10 digits like 8471.30, 8517.12.34)
✅ **CIF Values** (USD 1000, $500, EUR 2,500.00)
✅ **Product Descriptions** (near HS code or "Description:" label)
✅ **Countries** (origin and destination)
✅ **Invoice Numbers** (Invoice No: ABC123)
✅ **Dates** (MM/DD/YYYY, DD-MM-YYYY formats)
✅ **Document Type** (Invoice, Packing List, BOL, etc.)

---

## 💡 Best Practices

### For Users:
1. Use clear, high-resolution scans
2. Ensure document is straight (not rotated)
3. Avoid shadows and glare
4. Use PDF when possible (better quality)
5. Review extracted data before using

### For Developers:
1. Always check API health before starting frontend
2. Monitor Python service logs for errors
3. Test with various document types
4. Handle edge cases gracefully
5. Provide clear error messages to users

---

## 📝 Quick Reference

### Start Everything:

**Terminal 1 - Python API:**
```bash
cd python-ocr-service
venv\Scripts\activate
python app.py
```

**Terminal 2 - Next.js:**
```bash
cd kasongo-site
npm run dev
```

**Test:**
- Frontend: http://localhost:3000/tools/duty-calculator
- API Health: http://localhost:8000/api/health

---

## 🎉 Success Checklist

Before considering it "done":

- [ ] Python service starts without warnings
- [ ] API health check returns `200 OK`
- [ ] Frontend connects to API successfully
- [ ] Image upload works
- [ ] PDF upload works
- [ ] Camera capture works on mobile
- [ ] Extracted data appears in form fields
- [ ] Error messages are clear and helpful
- [ ] Mobile responsive design works
- [ ] Confidence scores display correctly

---

## 🆘 Still Having Issues?

**Check the logs:**

**Python service logs:** Look at terminal where `python app.py` is running

**Next.js logs:** Look at terminal where `npm run dev` is running

**Browser console:** Press F12 in browser, check Console tab

**Common log messages:**
- `TesseractNotFoundError` → Install Tesseract
- `Connection refused` → Python service not running
- `CORS error` → Check allowed origins in app.py
- `File size too large` → Document over 10MB

---

## 📞 Support

If you're still stuck:
1. Check both terminal logs
2. Verify all dependencies are installed
3. Test API health endpoint
4. Try with a simple, clear document first
5. Check firewall/antivirus isn't blocking port 8000

---

**Last Updated:** 2026-07-17
**Version:** 2.0 - Complete overhaul with PDF support
