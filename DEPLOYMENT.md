# Deployment Guide

## Production Build

The production build has been successfully created in the `dist/` directory.

### Build Stats:
- Total bundle size: ~2.5 MB (gzipped: ~750 KB)
- Build time: ~28 seconds
- All assets optimized and minified

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from the horror-movie-app directory:
```bash
cd horror-movie-app
vercel
```

3. Follow the prompts and add your TMDb API key as an environment variable

### Option 2: Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `horror-movie-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - **Name**: `VITE_TMDB_API_KEY`
   - **Value**: Your TMDb API key

6. Click "Deploy"

## Environment Variables

Required environment variables for production:

```
VITE_TMDB_API_KEY=your_actual_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## Local Preview

Test the production build locally:

```bash
npm run preview
```

This will serve the production build at http://localhost:4173

## Pre-Deployment Checklist

✅ Production build created successfully
✅ No TypeScript errors
✅ All routes configured
✅ Environment variables documented
✅ API integration tested
✅ Responsive design verified
✅ Accessibility features implemented
✅ Performance optimized

## Post-Deployment

After deployment:

1. Test all features on the live site
2. Verify TMDb API integration works
3. Check all routes (Home, Movie Details, Watchlist)
4. Test on mobile devices
5. Verify watchlist localStorage persistence

## Performance Notes

The build includes some large chunks (dash.all.min and hls libraries from react-player). These are only loaded when playing video trailers, so they don't affect initial page load.

## Troubleshooting

**API Key Issues:**
- Ensure the environment variable is named exactly `VITE_TMDB_API_KEY`
- Redeploy after adding environment variables

**Build Errors:**
- Run `npm run build` locally first to catch any issues
- Check TypeScript errors with `npm run lint`

**404 on Routes:**
- Vercel automatically handles SPA routing
- No additional configuration needed

## Support

For issues, check:
- Vercel deployment logs
- Browser console for errors
- Network tab for API failures
