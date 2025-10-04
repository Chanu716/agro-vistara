# 🔧 CORRECT MIGRATION ORDER

## ⚠️ Important: Run migrations in this EXACT order!

You're getting the error because the `update_updated_at_column()` function is created in the first migration file, but you need to run it first.

## 📋 Step-by-Step Instructions

### Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/tcmhhtcafdmzlcwidhhm/sql/new

---

### Migration 1: Initial Schema (MUST RUN FIRST)
**File**: `supabase/migrations/20251001164517_6f1de73b-afed-44a5-93ab-16dbaf864b63.sql`

This creates:
- All base tables (profiles, farms, crop_records, expenses, etc.)
- **The `update_updated_at_column()` function** ← This is what you need!
- All triggers and policies

**Action**: Copy the ENTIRE file content → Paste in SQL Editor → Click **RUN**

---

### Migration 2: Success Stories Table
**File**: `supabase/migrations/20251004000000_create_success_stories.sql`

This creates:
- `success_stories` table
- 4 sample success stories
- RLS policies

**Action**: Copy entire content → Paste → Click **RUN**

---

### Migration 3: Farming Guides Table (Initial)
**File**: `supabase/migrations/20251004000001_create_farming_guides.sql`

This creates:
- `farming_guides` table
- 4 initial farming guides (Paddy, Cotton, Composting, Drip irrigation)
- RLS policies

**Action**: Copy entire content → Paste → Click **RUN**

---

### Migration 4: Additional Farming Guides
**File**: `supabase/migrations/20251005000000_add_more_farming_guides.sql`

This adds:
- 10 more farming guides (Tomato, Wheat, Organic pest, etc.)

**Action**: Copy entire content → Paste → Click **RUN**

---

### Migration 5: Cold Storage Data
**File**: `supabase/migrations/20251005000001_add_cold_storage_data.sql`

This adds:
- 17 cold storage facilities across Andhra Pradesh

**Action**: Copy entire content → Paste → Click **RUN**

---

## ✅ Verification Query

After running ALL migrations, run this to verify:

```sql
-- Check if function exists
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'update_updated_at_column';

-- Check table counts
SELECT 
  (SELECT COUNT(*) FROM profiles) as profiles,
  (SELECT COUNT(*) FROM farms) as farms,
  (SELECT COUNT(*) FROM success_stories) as success_stories,
  (SELECT COUNT(*) FROM farming_guides) as farming_guides,
  (SELECT COUNT(*) FROM storage_facilities WHERE type='cold_storage') as cold_storage;
```

**Expected Results**:
- Function exists: `update_updated_at_column`
- success_stories: 4
- farming_guides: 14
- cold_storage: 17

---

## 🐛 If You Already Ran Some Migrations

If you've already run migrations 2, 3, 4, or 5 and got errors, you need to:

### Option A: Drop the tables and start fresh
```sql
-- Drop tables that failed to create
DROP TABLE IF EXISTS success_stories CASCADE;
DROP TABLE IF EXISTS farming_guides CASCADE;

-- Then run migrations in correct order starting from Migration 1
```

### Option B: Just run Migration 1 first
If you only ran migrations 2-5 and they failed, just run Migration 1 now, then the rest will work.

---

## 🎯 Quick Summary

**Problem**: You ran migration 2, 3, 4, or 5 BEFORE migration 1
**Solution**: Run Migration 1 first (it creates the function), then run the others

**Migration Order**:
1. `20251001164517_6f1de73b-afed-44a5-93ab-16dbaf864b63.sql` ← Creates function
2. `20251004000000_create_success_stories.sql`
3. `20251004000001_create_farming_guides.sql`
4. `20251005000000_add_more_farming_guides.sql`
5. `20251005000001_add_cold_storage_data.sql`
