-- Create the update_updated_at_column function if it doesn't exist
-- This function is used by triggers to automatically update the updated_at timestamp

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add comment for documentation
COMMENT ON FUNCTION public.update_updated_at_column() IS 'Automatically updates the updated_at column to the current timestamp when a row is updated';
