# 🚀 Deploy Python OCR API to Render.com (FREE)

## ⏱️ Time Required: 10 minutes

## 📋 Prerequisites
- GitHub account
- Code pushed to GitHub

---

## Step-by-Step Deployment

### 1️⃣ **Push Code to GitHub**

```bash
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site"
git add .
git commit -m "Add OCR document scanner with Render deployment"
git push origin main
```

---

### 2️⃣ **Create Render Account**

1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest option)
4. ✅ **No credit card required!**

---

### 3️⃣ **Create Web Service**

1. **Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository:**
   - Click "Connect account" if first time
   - Authorize Render to access your GitHub repos
   - Search and select your `kasongo-site` repository
   - Click **"Connect"**

3. **Configure Service:**
   Fill in the following:

   | Field | Value |
   |-------|-------|
   | **Name** | `kasongo-ocr-api` |
   | **Region** | Choose closest to your users (e.g., Oregon, Frankfurt) |
   | **Branch** | `main` |
   | **Root Directory** | `python-ocr-service` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn app:app --host 0.0.0.0 --port $PORT` |

4. **Select Plan:**
   - Choose **"Free"** plan
   - ✅ 0$/month
   - 512MB RAM (enough for OCR)
   - Service sleeps after 15 min inactivity

5. **Environment Variables** (optional, leave empty for now):
   - `PYTHON_VERSION` = `3.11` (optional, auto-detected)

6. Click **"Create Web Service"** 🎉

---

### 4️⃣ **Wait for Deployment**

- Render will now:
  1. ✅ Clone your repository
  2. ✅ Detect Python runtime
  3. ✅ Install Tesseract OCR automatically
  4. ✅ Install Python dependencies
  5. ✅ Start your FastAPI app
  
- **Progress:** Watch logs in real-time
- **Duration:** ~5-7 minutes for first deployment

---

### 5️⃣ **Get Your API URL**

Once deployed, you'll see:

```
✅ Live at: https://kasongo-ocr-api.onrender.com
```

**Test it:**
```bash
curl https://kasongo-ocr-api.onrender.com/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "Kasongo OCR Service",
  "version": "1.0.0",
  "tesseract_available": true
}
```

---

### 6️⃣ **Configure Frontend (Vercel)**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select `kasongo-site` project

2. **Add Environment Variable:**
   - Settings → Environment Variables
   - Click "Add New"
   
   ```
   Name: NEXT_PUBLIC_OCR_API_URL
   Value: https://kasongo-ocr-api.onrender.com
   ```
   
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

3. **Redeploy Frontend:**
   ```bash
   git commit --allow-empty -m "Add OCR API URL"
   git push
   ```
   
   Vercel will auto-deploy in ~2 minutes.

---

### 7️⃣ **Test Live**

1. Go to: **https://kassongo-site.vercel.app/tools/duty-calculator**

2. Complete Step 1 (Select countries)

3. In Step 2, upload a test invoice image

4. Watch the magic happen! ✨
   - Fields auto-fill from extracted data
   - Confidence score displayed
   - Review and adjust if needed

---

## 🎉 You're Live!

**Frontend:** https://kassongo-site.vercel.app  
**OCR API:** https://kasongo-ocr-api.onrender.com

**100% FREE hosting!** 🚀

---

## 🔧 Post-Deployment Configuration

### Monitor Your Service

**Render Dashboard:** https://dashboard.render.com

- **Logs:** View real-time application logs
- **Metrics:** CPU, memory, request counts
- **Events:** Deployment history
- **Settings:** Update environment variables

### Understanding Free Tier Limitations

**✅ What's Included:**
- 512MB RAM
- 500 hours/month (plenty!)
- Automatic HTTPS
- Tesseract OCR pre-installed
- Auto-deploys on git push

**⚠️ Limitations:**
- **Sleep Mode:** Service sleeps after 15 minutes of inactivity
- **Cold Start:** First request after sleep takes ~30 seconds
- **Bandwidth:** 100GB/month (more than enough)

**💡 Workaround for Sleep Mode (Optional):**

Use **cron-job.org** (free) to ping your API every 14 minutes during business hours:

1. Sign up: https://cron-job.org/en/
2. Create job:
   ```
   URL: https://kasongo-ocr-api.onrender.com/api/health
   Schedule: */14 * * * * (every 14 minutes)
   ```

This keeps your service "warm" during peak usage times.

---

## 🔄 Auto-Deployment

Every time you push to GitHub:

```bash
git add python-ocr-service/
git commit -m "Improve OCR accuracy"
git push
```

Render **automatically deploys** your changes!

**Deployment time:** ~3-5 minutes  
**Zero downtime:** Rolling deployments

---

## 🚨 Troubleshooting

### Issue: "Service unavailable"
**Cause:** Service is sleeping (cold start)  
**Fix:** Wait 30 seconds and retry. First request wakes it up.

### Issue: "CORS error"
**Cause:** Frontend URL not in CORS whitelist  
**Fix:** Update `app.py`:
```python
allow_origins=[
    "https://your-actual-domain.vercel.app",
    # ... rest
]
```

### Issue: "Tesseract not found"
**Should not happen!** Render installs it automatically.  
**If it does:** Check build logs in Render dashboard.

### Issue: "Request timeout"
**Cause:** Large image or complex document  
**Fix:** 
- Compress images before upload
- Current timeout: 30s (configurable in Render settings)

---

## 💰 Cost Monitoring

**Current Cost:** $0/month (Free tier)

**Free Tier Limits:**
- ✅ 500 compute hours/month
- ✅ 100GB bandwidth/month
- ✅ Unlimited requests

**When to Upgrade:**

If you exceed free tier OR want faster response times:

**Starter Plan:** $7/month
- ✅ No sleep mode (always on)
- ✅ 512MB RAM
- ✅ Faster cold starts
- ✅ 24/7 availability

**For this use case, FREE tier is sufficient** unless you have heavy traffic.

---

## 📊 Performance Tips

### 1. **Image Optimization**
Frontend should resize images before upload:
```typescript
// Add to DocumentScanner.tsx
const MAX_IMAGE_SIZE = 2048; // 2MP is plenty for OCR

const resizeImage = (file: File): Promise<Blob> => {
  // Resize logic here
};
```

### 2. **Rate Limiting**
Add to `app.py` to prevent abuse:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/ocr/scan")
@limiter.limit("10/minute")
async def scan_document(...):
    ...
```

### 3. **Caching**
Cache common OCR results (optional):
```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=100)
def cached_ocr(image_hash: str):
    # OCR logic
    pass
```

---

## 🎯 Success Metrics

**What to monitor:**
- ✅ Response times (should be <3s for most images)
- ✅ Extraction accuracy (confidence scores)
- ✅ Error rates
- ✅ Cold start frequency

**Render provides built-in metrics dashboard!**

---

## 🔐 Security Best Practices

1. **Add Rate Limiting** (shown above)
2. **Validate File Types:**
   ```python
   ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
   ```
3. **Set Max File Size:**
   ```python
   MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
   ```
4. **Enable HTTPS Only** (automatic with Render)
5. **Monitor Logs** for suspicious activity

---

## 📝 Maintenance Checklist

**Weekly:**
- [ ] Check Render dashboard for errors
- [ ] Review extraction accuracy (confidence scores)
- [ ] Monitor free tier usage

**Monthly:**
- [ ] Review user feedback on OCR accuracy
- [ ] Update Python dependencies if needed
- [ ] Check for Tesseract updates

**As Needed:**
- [ ] Improve extraction patterns based on real documents
- [ ] Add support for new document types
- [ ] Optimize cold start times

---

## 🎓 Learn More

- **Render Docs:** https://render.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Tesseract OCR:** https://github.com/tesseract-ocr/tesseract

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created (FREE)
- [ ] Web Service created and deployed
- [ ] Health endpoint responds successfully
- [ ] Vercel environment variable set
- [ ] Frontend redeployed
- [ ] Live test successful on duty calculator
- [ ] Monitoring dashboard bookmarked

---

## 🎉 Congratulations!

Your OCR API is now **live in production** for **$0/month**!

Users can now:
1. 📸 Take photo of invoice
2. ⚡ Upload to duty calculator
3. ✨ Fields auto-fill instantly
4. 🧮 Calculate landed costs

**No manual data entry. Pure magic.** 🪄

---

**Need Help?**
- Render Support: https://render.com/docs/support
- Check `INTEGRATION-COMPLETE.md` for testing guide
- Review `FREE-API-HOSTING-OPTIONS.md` for alternatives
