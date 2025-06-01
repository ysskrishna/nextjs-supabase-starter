# Supabase Setup

Supabase is an open-source backend-as-a-service platform that provides a suite of tools for building applications, including authentication, database, storage, and more. Setting up Supabase for your project is straightforward.

## Steps to Set Up Supabase

1. **Create a Supabase Account**
   - Go to [Supabase](https://supabase.com/) and sign up for a free account.

2. **Create a New Project**
   - After logging in, click on `New Project`.
   - Enter your project name, password, and select the region closest to you.
   - Click `Create new project`.

3. **Get API Keys and Project URL**
   - Once your project is created, navigate to the `Project Settings` > `API` section.
   - Copy your `Project URL` and `anon`/`service_role` keys. These will be used in your application to connect to Supabase.

4. **Configure Environment Variables**
   - In your project, add the following environment variables (e.g., in a `.env.local` file for Next.js):
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```


**References:**
- [Supabase Docs: Getting Started](https://supabase.com/docs/guides/getting-started)
- [Supabase GitHub](https://github.com/supabase/supabase)

---

# Google Project Setup for Supabase (OAuth)

To enable Google authentication in Supabase, you need to set up a Google Cloud project and configure OAuth credentials.

## Steps to Set Up Google Project for Supabase

1. **Create a Google Cloud Project**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click on the project dropdown and select `New Project`.
   - Enter a project name and click `Create`.

2. **Enable OAuth Consent Screen**
   - In the left sidebar, go to `APIs & Services` > `OAuth consent screen`.
   - Choose `External` and click `Create`.
   - Fill in the required fields (app name, user support email, developer contact info).
   - Save and continue.

3. **Create OAuth 2.0 Credentials**
   - Go to `APIs & Services` > `Credentials`.
   - Click `+ CREATE CREDENTIALS` > `OAuth client ID`.
   - Choose `Web application`.
   - Add the following to `Authorized redirect URIs` (replace `<project-ref>` with your Supabase project ref):
     ```
     https://<project-ref>.supabase.co/auth/v1/callback
     ```
   - Click `Create` and copy the `Client ID` and `Client Secret`.

4. **Configure Supabase Auth Settings**
   - In the Supabase dashboard, go to `Authentication` > `Providers` > `Google`.
   - Paste the `Client ID` and `Client Secret` from Google Cloud.
   - Save the changes.

5. **Test Google Sign-In**
   - Use the Supabase Auth API or client libraries to trigger Google sign-in in your app.

**References:**
- [Supabase Docs: Google Auth](https://supabase.com/docs/guides/auth/auth-google)
- [Google Cloud Docs: OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
