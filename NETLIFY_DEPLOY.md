# 🚀 Quick Netlify Deployment Steps

## Option 1: One-Click Deploy (Easiest)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Chanu716/agro-vistara)

Click the button above and follow these steps:

1. **Connect to GitHub** - Authorize Netlify
2. **Configure Repository** - It will fork/use your repo
3. **Add Environment Variables:**
   ```
   VITE_SUPABASE_PROJECT_ID=tcmhhtcafdmzlcwidhhm
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbWhodGNhZmRtemxjd2lkaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NjE3MzMsImV4cCI6MjA3NTAzNzczM30.5ae-J6NmM2TFtW6p3xoroeg35IYzlPEcq5-Rx0ztFNE
   VITE_SUPABASE_URL=https://tcmhhtcafdmzlcwidhhm.supabase.co
   VITE_OPENWEATHER_API_KEY=5aea7f12c9caa6c98be39f7bb6643184
   ```
4. **Deploy** - Wait 2-3 minutes
5. **Done!** - Your site is live

## Option 2: Manual Deploy via Netlify Dashboard

### Step 1: Go to Netlify
Visit: https://app.netlify.com/

### Step 2: Import Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select **`Chanu716/agro-vistara`** repository
4. Branch: `main`

### Step 3: Build Settings
```
Build command: npm run build
Publish directory: dist
```

### Step 4: Environment Variables
Click **"Show advanced"** → **"New variable"** and add:

| Variable | Value |
|----------|-------|
| VITE_SUPABASE_PROJECT_ID | tcmhhtcafdmzlcwidhhm |
| VITE_SUPABASE_PUBLISHABLE_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbWhodGNhZmRtemxjd2lkaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NjE3MzMsImV4cCI6MjA3NTAzNzczM30.5ae-J6NmM2TFtW6p3xoroeg35IYzlPEcq5-Rx0ztFNE |
| VITE_SUPABASE_URL | https://tcmhhtcafdmzlcwidhhm.supabase.co |
| VITE_OPENWEATHER_API_KEY | 5aea7f12c9caa6c98be39f7bb6643184 |

### Step 5: Deploy
Click **"Deploy site"**

⏱️ Build time: ~2-3 minutes

### Step 6: Get Your Live URL
After deployment, you'll get a URL like:
```
https://random-name-12345.netlify.app
```

## Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts to create site
```

## Post-Deployment

### 1. Update Supabase Redirect URLs
1. Go to: https://supabase.com/dashboard/project/tcmhhtcafdmzlcwidhhm/auth/url-configuration
2. Add your Netlify URL to:
   - **Site URL**
   - **Redirect URLs**

### 2. Test Your Live Site
- ✅ Sign up/Login
- ✅ Weather widget
- ✅ All pages load
- ✅ Offline mode
- ✅ Voice assistant

## Custom Domain (Optional)

1. **Netlify Dashboard** → **Domain settings**
2. **Add custom domain**
3. Update DNS records (Netlify provides instructions)

## Automatic Updates

Every time you push to GitHub `main` branch:
- Netlify automatically rebuilds
- New version deploys in 2-3 minutes
- Zero downtime deployment

## Need Help?

See full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**🎉 Your app will be live at: `https://your-site.netlify.app`**

Share it with farmers and start making an impact! 🌾
