# Netlify Deployment Guide for Agro-Vistara

## Prerequisites
- GitHub account
- Netlify account (free tier is sufficient)
- Repository pushed to GitHub

## Deployment Steps

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize Netlify site**:
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (e.g., `agro-vistara-app`)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables**:
   ```bash
   netlify env:set VITE_SUPABASE_PROJECT_ID "tcmhhtcafdmzlcwidhhm"
   netlify env:set VITE_SUPABASE_PUBLISHABLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbWhodGNhZmRtemxjd2lkaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NjE3MzMsImV4cCI6MjA3NTAzNzczM30.5ae-J6NmM2TFtW6p3xoroeg35IYzlPEcq5-Rx0ztFNE"
   netlify env:set VITE_SUPABASE_URL "https://tcmhhtcafdmzlcwidhhm.supabase.co"
   netlify env:set VITE_OPENWEATHER_API_KEY "5aea7f12c9caa6c98be39f7bb6643184"
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: add all 8 features with offline support"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select `agro-vistara` repository

3. **Configure Build Settings**:
   - Base directory: (leave empty)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" → "New variable"

4. **Add Environment Variables**:
   - `VITE_SUPABASE_PROJECT_ID` = `tcmhhtcafdmzlcwidhhm`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbWhodGNhZmRtemxjd2lkaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NjE3MzMsImV4cCI6MjA3NTAzNzczM30.5ae-J6NmM2TFtW6p3xoroeg35IYzlPEcq5-Rx0ztFNE`
   - `VITE_SUPABASE_URL` = `https://tcmhhtcafdmzlcwidhhm.supabase.co`
   - `VITE_OPENWEATHER_API_KEY` = `5aea7f12c9caa6c98be39f7bb6643184`

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)

### Option 3: Manual Deploy (Drag & Drop)

1. **Build the project locally**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Add environment variables in Site Settings

## Post-Deployment

### Configure Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Add custom domain or use Netlify subdomain

### Enable HTTPS
- Automatically enabled by Netlify

### Update Supabase Allowed Origins
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Netlify URL to "Site URL" and "Redirect URLs":
   - `https://your-site-name.netlify.app`
   - `https://your-site-name.netlify.app/**`

### Test PWA Features
- Service Worker should work automatically on HTTPS
- Test offline functionality by disabling network in DevTools

## Monitoring

- Build logs: Netlify Dashboard → Deploys → Build log
- Analytics: Netlify Dashboard → Analytics
- Forms: Netlify Dashboard → Forms (if you add forms later)

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deploying

## Support

- Netlify Status: https://www.netlifystatus.com/
- Netlify Docs: https://docs.netlify.com/
- Supabase Docs: https://supabase.com/docs
