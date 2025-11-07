# Authentication Flow Specification

## Overview
LexiPH uses Supabase Auth with email/password authentication.

## User Stories
- As a user, I can sign up with email and password
- As a user, I can log in with my credentials
- As a user, I can log out from any page
- As a user, I see my profile avatar in the header

## Authentication States
1. **Unauthenticated**: Show login/signup forms
2. **Authenticated**: Redirect to /chat
3. **Loading**: Show spinner during auth checks

## Routes
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/chat` - Protected route (requires auth)
- `/` - Landing page (public)

## Session Management
- Check session on app mount
- Persist session in Supabase (automatic)
- Clear session on logout
- Redirect to login if session expires

## Error Handling
- Invalid credentials: "Invalid email or password"
- Network error: "Connection failed. Please try again."
- Weak password: "Password must be at least 6 characters"
- Email already exists: "This email is already registered"