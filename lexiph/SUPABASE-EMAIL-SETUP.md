# Supabase Email Verification Setup

## ✅ What I've Implemented

I've added email verification to your app with these new pages:

1. **`/auth/verify-email`** - Shows after signup, tells user to check email
2. **`/auth/callback`** - Handles the redirect after user clicks email link
3. Updated **`/chat`** - Now checks if email is verified before allowing access
4. Updated **signup flow** - Redirects to verify-email instead of chat

## 🔧 What You Need to Configure in Supabase

Based on your screenshot, I can see you already have:
- **Site URL:** `https://lexiph.vercel.app`
- **Redirect URL:** `https://lexiph.vercel.app/**`

### Step 1: Update Email Templates

Go to: **Authentication** → **Email Templates**

#### Confirm Signup Template

Update the confirmation link to use your callback page:

**Current default:**
```
{{ .ConfirmationURL }}
```

**Change to:**
```
https://lexiph.vercel.app/auth/callback#access_token={{ .Token }}&type=signup
```

Or use this simpler version:
```
{{ .SiteURL }}/auth/callback#access_token={{ .Token }}&type=signup
```

### Step 2: Enable Email Confirmations

Go to: **Authentication** → **Providers** → **Email**

Make sure these are enabled:
- ✅ **Enable email provider**
- ✅ **Confirm email** (this requires users to verify their email)

### Step 3: Configure Redirect URLs (Already Done! ✅)

You already have this configured correctly:
- Site URL: `https://lexiph.vercel.app`
- Redirect URLs: `https://lexiph.vercel.app/**`

For local development, you may want to add:
- `http://localhost:3000/**`

## 📧 Email Flow

Here's how it works now:

```
1. User signs up at /auth/signup
   ↓
2. Account created (but not verified)
   ↓
3. Redirected to /auth/verify-email
   ↓
4. User receives email with verification link
   ↓
5. User clicks link in email
   ↓
6. Redirected to /auth/callback
   ↓
7. Callback verifies the token
   ↓
8. User redirected to /chat (now verified!)
```

## 🧪 Testing Locally

For local development, update your `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

And add to Supabase redirect URLs:
```
http://localhost:3000/**
```

Then the callback URL in email template becomes:
```
http://localhost:3000/auth/callback#access_token={{ .Token }}&type=signup
```

## 🎯 Quick Checklist

- [ ] Go to Supabase Dashboard → Authentication → Email Templates
- [ ] Update "Confirm signup" template with callback URL
- [ ] Verify "Confirm email" is enabled in Email provider settings
- [ ] Test signup flow:
  - [ ] Sign up with new email
  - [ ] See verify-email page
  - [ ] Receive email
  - [ ] Click link in email
  - [ ] Get redirected to chat
  - [ ] Can access chat (email verified)

## 🔍 Troubleshooting

### Not receiving emails?

1. Check Supabase logs: **Authentication** → **Logs**
2. Check your spam folder
3. Verify email provider is enabled
4. For testing, you can use a service like [Mailinator](https://www.mailinator.com/)

### Verification link not working?

1. Check the callback URL in email template matches your app URL
2. Verify redirect URLs include your domain
3. Check browser console for errors on `/auth/callback` page

### User can access chat without verifying?

1. Make sure "Confirm email" is enabled in Supabase
2. Clear browser cache and test with incognito mode
3. Check that `/chat` page has the verification check (it does now!)

## 📝 Email Template Example

Here's a complete example for the "Confirm signup" template:

**Subject:**
```
Confirm Your Email - LexiPH
```

**Body (HTML):**
```html
<h2>Welcome to LexiPH!</h2>
<p>Thanks for signing up. Please confirm your email address by clicking the button below:</p>
<p>
  <a href="{{ .SiteURL }}/auth/callback#access_token={{ .Token }}&type=signup" 
     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
    Verify Email Address
  </a>
</p>
<p>Or copy and paste this link into your browser:</p>
<p>{{ .SiteURL }}/auth/callback#access_token={{ .Token }}&type=signup</p>
<p>This link will expire in 24 hours.</p>
<p>If you didn't create an account, you can safely ignore this email.</p>
```

## 🚀 Production vs Development

### Production (Vercel)
- Site URL: `https://lexiph.vercel.app`
- Callback: `https://lexiph.vercel.app/auth/callback`

### Development (Local)
- Site URL: `http://localhost:3000`
- Callback: `http://localhost:3000/auth/callback`

**Tip:** Supabase's `{{ .SiteURL }}` variable automatically uses the correct URL based on where the request came from!

## ✅ You're Done!

Once you update the email template in Supabase, your email verification flow will work perfectly!
