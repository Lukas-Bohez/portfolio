# Cloudinary Image Upload Guide

## Overview

The Portfolio CMS demo uses **Cloudinary** for serving project card images. This ensures images are optimized, cached globally, and served with advanced transformations.

## Setup

### 1. Get Your Cloudinary Credentials

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to **Settings > API Keys**
3. Copy your:
   - **Cloud Name**: `dmefzpaea` (already configured)
   - **API Key**: Your unique API key
   - **API Secret**: Your unique API secret

### 2. Upload Images

Set environment variables and run the upload script:

```bash
export CLOUDINARY_API_KEY=your_api_key_here
export CLOUDINARY_API_SECRET=your_api_secret_here

node scripts/upload-cms-images.js
```

This will upload:

- `frontend/images/spireAi.png` → `cms-demo/spireAi`
- `frontend/images-app/mediaPlayer.png` → `cms-demo/mediaPlayer`
- `frontend/images/sentle.png` → `cms-demo/sentle`
- `frontend/images/industrialEmpire.png` → `cms-demo/industrialEmpire`

### 3. Verify URLs

Once uploaded, verify the URLs are accessible:

```bash
curl -I https://res.cloudinary.com/dmefzpaea/image/upload/cms-demo/spireAi
```

Should return `200 OK`.

## Cloudinary URL Format

All project images use this format:

```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{PUBLIC_ID}
```

With optional transformations:

```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/q_auto,f_avif,w_400,c_fill/{PUBLIC_ID}
```

## Updating Images

To update an image (e.g., improve the screenshot):

1. Replace the source file in `project-one/frontend/images/` or `project-one/frontend/images-app/`
2. Run the upload script again with the same public ID
3. Rebuild Portfolio: `npm run build`
4. Deploy: `npm run update:portfolio`

Cloudinary will automatically update all cached versions.

## CI/CD Integration

For automated uploads in GitHub Actions, add these secrets to your repository:

- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Then use the upload script in your workflow before building.
