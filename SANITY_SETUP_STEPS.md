# Complete Sanity Integration Setup Instructions

## What's Ready

✅ Portfolio is configured to use Sanity CMS
✅ Project ID: 3a5uodlw
✅ Dataset: production
✅ Studio URL: https://studio.sanity.io/p/3a5uodlw
✅ All code is ready to pull content from Sanity

## What You Need to Do

### 1. IMMEDIATELY Revoke Compromised Tokens

The tokens shared in chat are compromised and visible. **You must revoke them NOW**.

```
Website: https://www.sanity.io/organizations/oiwa723mE/project/3a5uodlw?orgId=oiwa723mE
Steps:
  1. Click "Settings" in left menu
  2. Click "Tokens"
  3. Click ⋯ (three dots) next to each token
  4. Select "Delete"
  5. Confirm deletion
```

**Tokens to delete:**

- access manager
- contributor
- Deploy Studio
- viewer

### 2. Generate New Secure Tokens

```
Website: https://www.sanity.io/organizations/oiwa723mE/project/3a5uodlw?orgId=oiwa723mE

For Development:
  1. Click "Tokens"
  2. Click "Add API Token"
  3. Name: "development"
  4. Permissions: "Contributor"
  5. Click "Create"
  6. Copy the token immediately (you'll need it)

For CI/CD Deployments (optional):
  1. Repeat above
  2. Name: "deploy"
  3. Permissions: "Deploy Studio"
```

### 3. Create .env.local File

In `/home/student/Project/Portfolio/`:

```bash
cat > .env.local << 'EOF'
# Sanity Configuration
SANITY_PROJECT_ID=3a5uodlw
SANITY_DATASET=production
SANITY_API_VERSION=2025-02-19

# REPLACE WITH YOUR NEW TOKEN FROM STEP 2
SANITY_API_TOKEN=paste_your_new_contributor_token_here

# Webhook secret (keep this, it's a placeholder for development)
SANITY_WEBHOOK_SECRET=dev-webhook-secret

# Public configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dmefzpaea
NEXT_PUBLIC_SANITY_STUDIO_URL=https://studio.sanity.io/p/3a5uodlw
NEXT_PUBLIC_SITE_URL=https://quizthespire.com/LukasBohez
EOF
```

### 4. Test the Connection

```bash
cd /home/student/Project/Portfolio
npm run build
```

If it succeeds, you're connected!

### 5. Access Your Studio

Go to: https://studio.sanity.io/p/3a5uodlw

Log in with your Sanity account and start creating content.

## Using the CMS Demo

The Portfolio's CMS Demo section at `/cms-demo` will:

- Pull real content from your Sanity project
- Fall back to local assets if Sanity is unavailable
- Display your projects with fullscreen image viewer

## Next Steps After Setup

1. ✅ Create content schemas in Sanity for your projects
2. ✅ Add project content to the `production` dataset
3. ✅ Deploy the Portfolio to see live CMS content
4. ✅ Set up webhooks to auto-revalidate when content changes

## Support

**Sanity Documentation**: https://www.sanity.io/docs
**Your Project**: https://www.sanity.io/organizations/oiwa723mE/project/3a5uodlw

## Security Reminders

❌ Never commit `.env.local` to Git
❌ Never share API tokens in chat or email  
❌ Never hardcode tokens in code
✅ Always use environment variables
✅ Rotate tokens if compromised
✅ Use least-privilege permissions (Contributor, not Admin)
