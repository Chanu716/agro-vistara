# 🚀 Deployment Guide - Agro-Vistara

This guide will help you deploy Agro-Vistara to Netlify.

## Prerequisites

1. ✅ GitHub account with repository access
2. ✅ Netlify account (free tier works fine)
3. ✅ Supabase project set up
4. ✅ OpenWeatherMap API key

## Step-by-Step Netlify Deployment

### Method 1: Deploy via Netlify Dashboard (Recommended)

#### 1. Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the **`agro-vistara`** repository

#### 2. Configure Build Settings

In the deployment configuration screen, enter:

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Click **"Show advanced"** and add environment variables.

#### 3. Add Environment Variables

Click **"Add environment variable"** and add each of these:

| Variable Name | Value |
|--------------|-------|
| `VITE_SUPABASE_PROJECT_ID` | Your Supabase project ID |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key |
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key |

**Where to find these values:**
- **Supabase values**: Go to your Supabase project → Settings → API
- **OpenWeatherMap key**: [OpenWeatherMap API Keys](https://home.openweathermap.org/api_keys)

#### 4. Deploy

1. Click **"Deploy site"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at a random Netlify URL (e.g., `random-name-12345.netlify.app`)

#### 5. Configure Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: agro-vistara
# - Build command: npm run build
# - Publish directory: dist

# Deploy
netlify deploy --prod
```

### Method 3: Drag & Drop Deploy

If you prefer manual deployment:

```bash
# Build the project locally
npm run build

# The build output will be in the 'dist' folder
# Go to Netlify Dashboard
# Drag and drop the 'dist' folder to deploy
```

## Post-Deployment Configuration

### 1. Set up Redirects (Already configured in `netlify.toml`)

Our `netlify.toml` file handles:
- SPA routing redirects
- Security headers
- Service worker caching
- Asset optimization

### 2. Enable HTTPS (Automatic)

Netlify automatically provisions SSL certificates. Your site will be available via HTTPS.

### 3. Configure Supabase Redirect URLs

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Netlify URL to **Site URL** and **Redirect URLs**:
   ```
   https://your-site-name.netlify.app
   ```

### 4. Test the Deployment

Visit your Netlify URL and test:
- ✅ User authentication (sign up/login)
- ✅ Weather widget loads
- ✅ All pages accessible
- ✅ Offline mode works
- ✅ Voice assistant functions
- ✅ Data saves to Supabase

## Continuous Deployment

Netlify is configured for automatic deployments:

- **Push to `main`** → Automatic production deploy
- **Pull requests** → Deploy previews automatically created
- **Build logs** → Available in Netlify dashboard

## Environment Variables Management

To update environment variables after deployment:

1. Go to **Site settings** → **Environment variables**
2. Edit or add new variables
3. Click **"Save"**
4. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

## Build Optimization

Our build is optimized with:
- ✅ Vite code splitting
- ✅ Tree shaking (unused code removal)
- ✅ Asset minification
- ✅ Image optimization
- ✅ Service worker pre-caching

**Expected build time:** 2-3 minutes  
**Expected bundle size:** ~500KB (gzipped)

## Monitoring & Analytics

### Enable Netlify Analytics (Optional)

1. Go to **Site settings** → **Analytics**
2. Enable **Netlify Analytics** for visitor insights

### Performance Monitoring

Monitor your site with:
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- Netlify built-in analytics

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Solution: Double-check all 4 environment variables are set correctly

**Error: Build command failed**
- Solution: Run `npm run build` locally to identify the issue
- Check Node.js version (should be 18+)

### Site Loads but Features Don't Work

**Weather widget not loading**
- Check OpenWeatherMap API key is valid
- Verify API key has not exceeded rate limits

**Authentication fails**
- Verify Supabase URL and keys are correct
- Check Supabase redirect URLs include your Netlify domain

**Offline mode not working**
- Clear browser cache and service workers
- Redeploy the site to update service worker

### Performance Issues

**Slow initial load**
- Enable Netlify CDN (automatic)
- Optimize images before uploading
- Check Supabase database indexes

## Rollback

If you need to rollback to a previous version:

1. Go to **Deploys** in Netlify dashboard
2. Find the working deployment
3. Click **"Publish deploy"** to restore it

## Support

For deployment issues:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community Forum](https://answers.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Netlify account created
- [ ] Site connected to GitHub repository
- [ ] Build settings configured (`npm run build`, `dist`)
- [ ] All 4 environment variables added
- [ ] Site deployed successfully
- [ ] HTTPS enabled (automatic)
- [ ] Supabase redirect URLs updated
- [ ] Authentication tested
- [ ] All features tested on production
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

---

**Congratulations! Your Agro-Vistara app is now live! 🎉🌾**

**Next Steps:**
1. Share your deployment URL
2. Test all features thoroughly
3. Monitor performance and errors
4. Gather user feedback
5. Plan future enhancements

Need help? Open an issue on GitHub or contact support.
