# Authentication Guide

This guide provides comprehensive instructions for setting up and managing authentication in your NextJS Supabase project.

## Table of Contents

- [Authentication Guide](#authentication-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Supabase Setup](#supabase-setup)
  - [Google OAuth Configuration](#google-oauth-configuration)
  - [Environment Configuration](#environment-configuration)
  - [Security Best Practices](#security-best-practices)
  - [Additional Resources](#additional-resources)

## Prerequisites

- A Supabase account
- A Google Cloud Platform account (for Google OAuth)
- Node.js and npm/yarn installed
- Basic understanding of Next.js and React

## Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com/) and sign up/login
   - Click `New Project`
   - Enter project details:
     - Project name
     - Database password
     - Region (choose closest to your users)
   - Click `Create new project`

2. **Configure Authentication Settings**
   - Navigate to `Authentication` > `Settings`
   - Set up Site URL:
     - Development: `http://localhost:3000`
     - Production: Your deployed URL
   - Configure Redirect URLs:
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://your-domain.com/auth/callback`

3. **Enable Authentication Methods**
   - Go to `Authentication` > `Providers`
   - Enable Email/Password authentication
   - Configure Google OAuth (see next section)

## Google OAuth Configuration

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Navigate to `APIs & Services` > `OAuth consent screen`
   - Choose `External` user type
   - Fill required information:
     - App name
     - User support email
     - Developer contact information

2. **Create OAuth Credentials**
   - Go to `APIs & Services` > `Credentials`
   - Click `+ CREATE CREDENTIALS` > `OAuth client ID`
   - Select `Web application`
   - Add Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://your-production-domain.com
     ```
   - Add Authorized redirect URIs:
     ```
     http://localhost:3000/auth/callback
     https://your-production-domain.com/auth/callback
     https://<your-supabase-project>.supabase.co/auth/v1/callback
     ```

3. **Configure Supabase with Google Credentials**
   - Copy Client ID and Client Secret from Google Cloud Console
   - In Supabase Dashboard:
     - Go to `Authentication` > `Providers` > `Google`
     - Enable Google provider
     - Paste credentials
     - Save changes

## Environment Configuration

Create a `.env` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different keys for development and production
   - Regularly rotate sensitive keys

2. **Authentication**
   - Implement proper session management
   - Use secure cookie settings
   - Enable HTTPS in production
   - Implement rate limiting

3. **API Security**
   - Validate all user inputs
   - Implement proper CORS policies
   - Use Row Level Security (RLS) in Supabase

4. **General Security**
   - Keep dependencies updated
   - Regular security audits
   - Implement proper error handling
   - Use secure headers

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase GitHub](https://github.com/supabase/supabase) 