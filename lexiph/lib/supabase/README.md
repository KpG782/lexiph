# Supabase Setup

## Database Schema Setup

To set up the database schema and security policies:

1. Go to your Supabase project dashboard at https://supabase.com
2. Navigate to the SQL Editor (left sidebar)
3. Create a new query
4. Copy and paste the contents of `schema.sql` into the editor
5. Click "Run" to execute the SQL commands

This will:
- Create the `profiles` table with columns: id, email, full_name, avatar_url, created_at, updated_at
- Enable Row Level Security (RLS) on the profiles table
- Create RLS policies that allow users to view and update only their own profile
- Create a database trigger that automatically creates a profile record when a new user signs up

## Verification

After running the SQL, verify the setup:

1. Go to "Table Editor" in the Supabase dashboard
2. You should see the `profiles` table
3. Go to "Authentication" → "Policies" to see the RLS policies
4. The trigger will automatically create profile records for new signups

## Client Configuration

The Supabase client is configured in `client.ts` and uses the following environment variables from `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

These are already configured in the project.
