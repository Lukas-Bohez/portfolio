# Sanity Integration Security Guide

## ⚠️ CRITICAL: Your API tokens have been compromised

The tokens you shared in the chat are now visible and must be **immediately revoked**.

### Step 1: Revoke Compromised Tokens (DO THIS NOW)

1. Go to: https://www.sanity.io/organizations/oiwa723mE/project/3a5uodlw?orgId=oiwa723mE
2. Click on "Settings" → "Tokens"
3. Delete these compromised tokens:
   - access manager
   - contributor
   - Deploy Studio
   - viewer

### Step 2: Generate New Secure Tokens

1. Go to: https://www.sanity.io/organizations/oiwa723mE/project/3a5uodlw?orgId=oiwa723mE
2. Click "Tokens" in the left menu
3. Create new tokens for these use cases:

   **For development (.env.local):**
   - Create a "Contributor" token (for API access in development)
   - Copy it immediately and save to `.env.local`

   **For production/CI deployment:**
   - Create a "Deploy Studio" token (for automated deployments)
   - Store in GitHub Secrets or secure CI/CD environment

### Step 3: Set Up .env.local

1. Create file: `/home/student/Project/Portfolio/.env.local`
2. Copy contents from `.env.local.template`
3. Replace placeholders with your NEW tokens:

```
SANITY_API_TOKEN=your_new_token_from_step_2
```

**NEVER commit `.env.local` to Git** - it's in `.gitignore` for a reason.

### Step 4: Verify Connection

Run this to test your Sanity connection:

```bash
cd /home/student/Project/Portfolio
npm run build
```

If successful, the CMS will pull content from your Sanity project.

### Step 5: Access Your Studio

You can now access your Sanity studio at:

- **Hosted option**: https://studio.sanity.io/p/3a5uodlw
- **Custom domain** (if you deploy the studio app): https://quizthespire.com/studio (requires additional setup)

## Security Best Practices

1. ✅ **Never share API tokens** in chat, email, or public repos
2. ✅ **Use `.env.local`** for local development secrets (not in Git)
3. ✅ **Use GitHub Secrets** for CI/CD pipelines
4. ✅ **Rotate tokens regularly** if you suspect compromise
5. ✅ **Use least privilege** - create tokens with minimum required permissions

## Project Information

- **Project ID**: 3a5uodlw
- **Organization ID**: oiwa723mE
- **Dataset**: production
- **Studio URL**: https://studio.sanity.io/p/3a5uodlw
- **Custom app ID**: ajaazrvjh81xm2zb8v31e2m3 (for quizthespire.com integration)

## Next Steps

1. Revoke compromised tokens (CRITICAL)
2. Generate new tokens
3. Create `.env.local` with new tokens
4. Test the connection by rebuilding the Portfolio
5. Begin adding content to your Sanity project
