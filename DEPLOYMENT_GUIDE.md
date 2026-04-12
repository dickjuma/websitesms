# SMA Systems Website - Production Launch Guide

## ✅ Configuration Complete

All URLs have been updated from `sma-systems.com` to `smassystems.com`.

### Updated Files:
- `.env` - Production URLs
- `src/lib/email.ts` - Website URLs and email addresses
- `src/lib/site-settings.ts` - Default site settings
- `src/app/admin/settings/page.tsx` - Admin default settings
- `src/components/sections/final-cta-section.tsx` - Enterprise email
- `src/components/sections/services-cta-section.tsx` - Contact email

## 🚀 Deployment Steps

### 1. Build the project
```bash
cd website
npm run build
```

### 2. Deploy to hosting (Vercel recommended)
```bash
vercel --prod
```

Or use other hosting options:
- **Vercel**: Connect GitHub repo, auto-deploys
- **AWS Amplify**: Console deployment
- **Self-hosted**: Run `npm start` with PM2

### 3. Verify DNS
- Point your domain `smassystems.com` to the hosting provider
- Add SSL certificate (automatic on Vercel)

### 4. Resend Domain Verification (for emails)
- Go to https://resend.com/domains
- Add `smassystems.com`
- Add DNS records to verify
- Once verified, emails will work

### 5. MongoDB Atlas
- Ensure IP whitelist includes your hosting provider
- Database: `sma_systems`

## 📋 Environment Variables (Production)

| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| NEXT_PUBLIC_APP_URL | https://smassystems.com |
| ALLOWED_ORIGINS | https://smassystems.com,http://localhost:3000 |
| MONGODB_URI | (your MongoDB connection string) |
| RESEND_API_KEY | re_... |
| RESEND_FROM_EMAIL | info@smassystems.com |
| GROQ_API_KEY | gsk_... |

## 🔧 Features Working

- ✅ Contact form → saves to DB → sends email
- ✅ Quote requests → saves to DB → sends email
- ✅ Book demo → saves to DB → sends email
- ✅ Chatbot → AI powered via Groq
- ✅ Admin panel → contacts, quotes, demos management
- ✅ Polling-based real-time (no sockets needed)

## 📞 Email Addresses

- **From**: info@smassystems.com
- **To**: info@smassystems.com (team notifications)
- **Support**: hello@smassystems.com
- **Sales**: sales@smassystems.com
- **Enterprise**: enterprise@smassystems.com