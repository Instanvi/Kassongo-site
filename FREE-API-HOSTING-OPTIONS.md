# 🆓 FREE Python OCR API Hosting Options

Your Vercel frontend is live at: **https://kassongo-site.vercel.app/**

Now let's deploy the Python OCR backend - **100% FREE!**

---

## 🎯 Best FREE Options (Ranked)

### ⭐ Option 1: **Render.com** (RECOMMENDED - Easiest!)

**Why Render:**
- ✅ **FREE tier forever** (500 hours/month)
- ✅ **No credit card required**
- ✅ **Auto-deploys from GitHub**
- ✅ **Built-in Tesseract support**
- ✅ **Automatic HTTPS**
- ✅ **Simple setup (5 minutes)**

**Limitations:**
- Spins down after 15 min inactivity (cold start ~30 seconds)
- 512MB RAM (enough for OCR)

**Setup Steps:**

1. **Push code to GitHub** (if not already)
   ```bash
   cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site"
   git add python-ocr-service/
   git commit -m "Add Python OCR service"
   git push
   ```

2. **Create Render account** (free)
   - Go to: https://render.com
   - Sign up with GitHub (no credit card needed)

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select `kasongo-site` repository

4. **Configure Service:**
   ```
   Name: kasongo-ocr-api
   Region: Choose closest to your users
   Branch: main
   Root Directory: python-ocr-service
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
   Instance Type: Free
   ```

5. **Add Environment Variables:**
   ```
   PORT=10000
   ```

6. **Deploy!**
   - Click "Create Web Service"
   - Render installs Tesseract automatically ✨
   - Wait 3-5 minutes for deployment

7. **Get your API URL:**
   ```
   https://kasongo-ocr-api.onrender.com
   ```

8. **Update frontend** (`DocumentScanner.tsx`):
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || 
                   'https://kasongo-ocr-api.onrender.com';
   
   const response = await fetch(`${API_URL}/api/ocr/scan`, {
     method: 'POST',
     body: formData,
   });
   ```

**✅ DONE! Your OCR API is live for FREE!**

---

### ⭐ Option 2: **Railway.app** (Great Alternative)

**Why Railway:**
- ✅ **$5 free credit/month** (enough for OCR)
- ✅ **No sleep time** (always on)
- ✅ **Faster than Render**
- ✅ **Auto HTTPS**

**Limitations:**
- Requires credit card (but won't be charged with free tier)
- Free credit resets monthly

**Setup:**

1. **Create `railway.json`:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "uvicorn app:app --host 0.0.0.0 --port $PORT",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Create `nixpacks.toml`:**
   ```toml
   [phases.setup]
   aptPkgs = ["tesseract-ocr", "libtesseract-dev"]
   
   [phases.install]
   cmds = ["pip install -r requirements.txt"]
   
   [start]
   cmd = "uvicorn app:app --host 0.0.0.0 --port $PORT"
   ```

3. **Deploy:**
   - Go to https://railway.app
   - Sign up (credit card required but free tier available)
   - "New Project" → "Deploy from GitHub"
   - Select repo → Select `python-ocr-service` folder
   - Railway auto-deploys

4. **Get URL:** 
   ```
   https://kasongo-ocr.up.railway.app
   ```

---

### ⭐ Option 3: **PythonAnywhere** (Simplest - No Git Required)

**Why PythonAnywhere:**
- ✅ **100% FREE tier** (forever)
- ✅ **No credit card needed**
- ✅ **Web-based file upload** (no Git required)
- ✅ **Pre-installed Tesseract**

**Limitations:**
- Slower than Render/Railway
- Daily limit: 100,000 requests (plenty for starting)

**Setup:**

1. **Sign up:** https://www.pythonanywhere.com/registration/register/beginner/

2. **Upload files:**
   - Dashboard → Files
   - Upload `app.py`, `requirements.txt`

3. **Install dependencies:**
   - Dashboard → Consoles → Bash
   ```bash
   pip install --user -r requirements.txt
   ```

4. **Create Web App:**
   - Dashboard → Web → Add new web app
   - Python 3.10 → Manual configuration
   - WSGI file: Point to your app

5. **Configure WSGI:**
   ```python
   import sys
   path = '/home/yourusername/kasongo-ocr'
   if path not in sys.path:
       sys.path.append(path)
   
   from app import app as application
   ```

6. **Reload web app**

7. **Your URL:**
   ```
   https://yourusername.pythonanywhere.com
   ```

---

### ⭐ Option 4: **Vercel Serverless Functions** (Same as Frontend!)

**Why Vercel:**
- ✅ **Already using it for frontend!**
- ✅ **FREE tier generous**
- ✅ **Zero config deployment**
- ✅ **Same domain as frontend**

**Limitations:**
- ⚠️ Tesseract requires custom setup
- 50MB deployment size limit
- 10 second function timeout

**Setup** (Advanced - Requires Docker layer):

1. **Create `vercel.json`:**
   ```json
   {
     "functions": {
       "api/ocr/**/*.py": {
         "runtime": "python3.9",
         "includeFiles": "**"
       }
     }
   }
   ```

2. **Install Tesseract as layer** (complex - not recommended for beginners)

**Verdict:** Use Render.com instead - easier!

---

### ⭐ Option 5: **Hugging Face Spaces** (AI-Focused)

**Why Hugging Face:**
- ✅ **FREE GPU tier available**
- ✅ **Great for AI/ML workloads**
- ✅ **Auto HTTPS**

**Setup:**

1. Sign up: https://huggingface.co/join
2. Create Space: FastAPI
3. Upload code
4. Deployed!

---

## 🏆 RECOMMENDATION: Use Render.com

**Step-by-Step (10 minutes total):**

### 1. Create `render.yaml` (for easier deployment)

Create this file in `python-ocr-service/`:

```yaml
services:
  - type: web
    name: kasongo-ocr-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
    plan: free
```

### 2. Push to GitHub

```bash
cd "c:\Users\Thuram Jr\source\repos\PottaPOS\Potta Finance\kasongo-site"
git add .
git commit -m "Add OCR API with Render config"
git push
```

### 3. Deploy on Render

1. Go to https://dashboard.render.com
2. New → Web Service
3. Connect GitHub
4. Select your repo
5. Render auto-detects `render.yaml` ✨
6. Click "Create Web Service"
7. Wait 5 minutes

### 4. Update Frontend Environment Variables

In Vercel dashboard:

```
Settings → Environment Variables → Add

Name: NEXT_PUBLIC_OCR_API_URL
Value: https://kasongo-ocr-api.onrender.com
```

Redeploy frontend:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### 5. Update Frontend Code

```typescript
// DocumentScanner.tsx
const OCR_API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || 
                    'https://kasongo-ocr-api.onrender.com';

const response = await fetch(`${OCR_API_URL}/api/ocr/scan`, {
  method: 'POST',
  body: formData,
});
```

---

## 🎉 You're Live!

- **Frontend:** https://kassongo-site.vercel.app
- **OCR API:** https://kasongo-ocr-api.onrender.com

**Test it:**
```bash
curl https://kasongo-ocr-api.onrender.com/api/health
```

---

## 💡 Keeping It FREE Forever

### Render.com Tips:
- ✅ Free tier is 500 hours/month (plenty!)
- ✅ Service sleeps after 15 min inactivity
- ✅ First request after sleep takes ~30 seconds (acceptable)
- ✅ To avoid sleep: Upgrade to $7/month (optional)

### Cost Optimization:
1. **Add "Keep Alive" (optional):**
   - Use cron-job.org (free) to ping your API every 14 minutes
   - Keeps service awake during business hours

2. **Rate Limiting:**
   Add to `app.py`:
   ```python
   from fastapi import Request
   from slowapi import Limiter
   from slowapi.util import get_remote_address
   
   limiter = Limiter(key_func=get_remote_address)
   app.state.limiter = limiter
   
   @app.post("/api/ocr/scan")
   @limiter.limit("10/minute")  # 10 requests per minute per IP
   async def scan_document(...):
       ...
   ```

---

## 🆘 Troubleshooting

### Issue: CORS errors
**Fix:** Update `app.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kassongo-site.vercel.app",
        "https://*.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Cold starts too slow
**Options:**
1. Upgrade to Render paid tier ($7/month - always on)
2. Use Railway.app instead (no sleep)
3. Add keep-alive pings

### Issue: Tesseract not found
- Render installs it automatically
- Railway: Add to `nixpacks.toml`
- PythonAnywhere: Pre-installed

---

## 📊 Free Tier Limits Comparison

| Platform | Cost | Always On | Cold Start | RAM | Storage |
|----------|------|-----------|------------|-----|---------|
| **Render** | FREE | No (15min) | ~30s | 512MB | 512MB |
| **Railway** | $5 credit/mo | Yes | <1s | 512MB | 1GB |
| **PythonAnywhere** | FREE | Yes | N/A | 512MB | 512MB |
| **Vercel** | FREE | Yes | <1s | 1GB | 50MB |

---

## ✅ Final Checklist

- [ ] Python OCR service deployed (Render recommended)
- [ ] Frontend environment variable set
- [ ] CORS configured for production domain
- [ ] Test upload on live site
- [ ] Monitor free tier usage

---

## 🎯 Next Steps

1. **Deploy to Render** (10 minutes)
2. **Update frontend env vars**
3. **Test live:** https://kassongo-site.vercel.app/tools/duty-calculator
4. **Done! 🎉**

**No payment required. 100% FREE to start!** 🚀
