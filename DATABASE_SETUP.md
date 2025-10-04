# Database Setup Guide

This guide will help you set up the Supabase database with all required tables and sample data.

## Prerequisites

- A Supabase project created at [supabase.com](https://supabase.com)
- Your Supabase project URL and anon key configured in `.env`

## Step 1: Run Migrations in Supabase Dashboard

### Option A: Using Supabase Dashboard SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Create a new query
4. Copy and paste each migration file content **in order**:

#### Migration 1: Success Stories Table
Copy content from: `supabase/migrations/20251004000000_create_success_stories.sql`

Click **Run** to execute.

#### Migration 2: Farming Guides Table
Copy content from: `supabase/migrations/20251004000001_create_farming_guides.sql`

Click **Run** to execute.

#### Migration 3: Additional Farming Guides Data
Copy content from: `supabase/migrations/20251004000002_add_more_farming_guides.sql`

Click **Run** to execute.

#### Migration 4: Cold Storage Facilities
Copy content from: `supabase/migrations/20251004000003_create_storage_facilities.sql`

Click **Run** to execute.

### Option B: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Step 2: Verify Tables Created

After running all migrations, verify the tables exist:

1. Go to **Table Editor** in Supabase dashboard
2. You should see these new tables:
   - `success_stories`
   - `farming_guides`
   - `storage_facilities`

## Step 3: Check Sample Data

### Success Stories
Navigate to `success_stories` table - should have 4 sample stories

### Farming Guides
Navigate to `farming_guides` table - should have 15 guides across different categories

### Storage Facilities
Navigate to `storage_facilities` table - should have 12 cold storage facilities in Andhra Pradesh

## Step 4: Test in Application

1. Start your development server:
```bash
npm run dev
```

2. Navigate to these pages to verify data loads correctly:
   - **Success Stories**: http://localhost:8080/stories
   - **Farming Guides**: http://localhost:8080/guides
   - **Storage Facilities**: http://localhost:8080/storage

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran all migrations in order
- Check the SQL Editor for any error messages
- Verify you're connected to the correct Supabase project

### Error: "permission denied"
- The migrations include RLS policies
- Make sure you're authenticated in the app
- Check that RLS is enabled on the tables

### No Data Showing
- Verify sample data was inserted (check Table Editor)
- Check browser console for API errors
- Ensure your `.env` file has correct Supabase credentials

## Table Schemas

### success_stories
```sql
- id (uuid, primary key)
- farmer_name (text)
- village (text)
- district (text)
- story_title (text)
- story_content (text)
- crop_type (text)
- yield_improvement (text)
- income_increase (text)
- image_url (text, optional)
- published_date (date)
- is_featured (boolean)
- created_at (timestamp)
```

### farming_guides
```sql
- id (uuid, primary key)
- title (text)
- title_te (text)
- category (text) - complete, preparation, planting, maintenance, harvesting
- crop_type (text, optional)
- description (text)
- description_te (text)
- steps (jsonb) - array of step objects
- estimated_time (text, optional)
- difficulty_level (text) - beginner, intermediate, advanced
- is_featured (boolean)
- created_at (timestamp)
```

### storage_facilities
```sql
- id (uuid, primary key)
- facility_name (text)
- facility_type (text) - cold_storage, warehouse, processing_center
- address (text)
- district (text)
- state (text)
- pincode (text)
- contact_phone (text, optional)
- contact_email (text, optional)
- capacity_tons (numeric, optional)
- temperature_range (text, optional)
- commodities_stored (text[], optional)
- facilities_available (text[], optional)
- latitude (numeric, optional)
- longitude (numeric, optional)
- is_active (boolean)
- created_at (timestamp)
```

## Next Steps

After successful database setup:
1. ✅ All tables created
2. ✅ Sample data loaded
3. ✅ Application showing data correctly
4. 🚀 Ready to deploy to Netlify!

Refer to `NETLIFY_DEPLOY.md` for deployment instructions.
