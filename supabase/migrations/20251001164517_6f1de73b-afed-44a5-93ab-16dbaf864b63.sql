-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  village TEXT,
  district TEXT,
  state TEXT DEFAULT 'Telangana',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create farms table
CREATE TABLE public.farms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  total_area_acres DECIMAL(10,2) NOT NULL,
  soil_type TEXT,
  water_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on farms
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Farms policies
CREATE POLICY "Users can view own farms"
  ON public.farms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own farms"
  ON public.farms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own farms"
  ON public.farms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own farms"
  ON public.farms FOR DELETE
  USING (auth.uid() = user_id);

-- Create crop_records table
CREATE TABLE public.crop_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  crop_type TEXT NOT NULL, -- main_crop, inter_crop, multi_crop
  area_acres DECIMAL(10,2) NOT NULL,
  planting_date DATE NOT NULL,
  expected_harvest_date DATE,
  actual_harvest_date DATE,
  expected_yield_kg DECIMAL(10,2),
  actual_yield_kg DECIMAL(10,2),
  status TEXT DEFAULT 'planned', -- planned, growing, harvested
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on crop_records
ALTER TABLE public.crop_records ENABLE ROW LEVEL SECURITY;

-- Crop records policies
CREATE POLICY "Users can view own crop records"
  ON public.crop_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own crop records"
  ON public.crop_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crop records"
  ON public.crop_records FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own crop records"
  ON public.crop_records FOR DELETE
  USING (auth.uid() = user_id);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  crop_record_id UUID REFERENCES public.crop_records(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expense_type TEXT NOT NULL, -- seeds, fertilizer, pesticide, labor, equipment, other
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  expense_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on expenses
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Expenses policies
CREATE POLICY "Users can view own expenses"
  ON public.expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON public.expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON public.expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON public.expenses FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage_facilities table (public data)
CREATE TABLE public.storage_facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- government_godown, private_warehouse, cold_storage
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  capacity_tonnes DECIMAL(10,2),
  contact_phone TEXT,
  facilities TEXT[], -- array of available facilities
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on storage_facilities (public read)
ALTER TABLE public.storage_facilities ENABLE ROW LEVEL SECURITY;

-- Storage facilities policies (public read)
CREATE POLICY "Anyone can view storage facilities"
  ON public.storage_facilities FOR SELECT
  TO authenticated
  USING (true);

-- Create crop_recommendations table (public data)
CREATE TABLE public.crop_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_name TEXT NOT NULL,
  best_season TEXT NOT NULL, -- kharif, rabi, summer
  suitable_soils TEXT[],
  companion_crops TEXT[], -- for inter-cropping
  rotation_crops TEXT[], -- for multi-cropping
  planting_tips TEXT,
  care_instructions TEXT,
  avg_yield_per_acre DECIMAL(10,2),
  market_price_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on crop_recommendations (public read)
ALTER TABLE public.crop_recommendations ENABLE ROW LEVEL SECURITY;

-- Crop recommendations policies (public read)
CREATE POLICY "Anyone can view crop recommendations"
  ON public.crop_recommendations FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON public.farms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crop_records_updated_at
  BEFORE UPDATE ON public.crop_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample crop recommendations
INSERT INTO public.crop_recommendations (crop_name, best_season, suitable_soils, companion_crops, rotation_crops, planting_tips, care_instructions, avg_yield_per_acre, market_price_range) VALUES
('Rice (Paddy)', 'kharif', ARRAY['Clay', 'Loamy'], ARRAY['Green Gram', 'Black Gram'], ARRAY['Wheat', 'Chickpea'], 'Plant during monsoon. Requires standing water. Transplant 20-25 day old seedlings.', 'Maintain 2-3 inches water level. Apply nitrogen in 3 splits. Control weeds early.', 2500, '₹1,800-₹2,200 per quintal'),
('Cotton', 'kharif', ARRAY['Black', 'Red', 'Loamy'], ARRAY['Green Gram', 'Cowpea'], ARRAY['Wheat', 'Chickpea'], 'Sow after first monsoon rain. Spacing 60x30 cm. Use treated seeds.', 'Irrigate at critical stages. Spray for bollworm control. Remove weeds regularly.', 1200, '₹5,500-₹6,500 per quintal'),
('Maize', 'kharif', ARRAY['Loamy', 'Sandy Loam'], ARRAY['Cowpea', 'Soybean'], ARRAY['Wheat', 'Chickpea'], 'Line sowing with 60x20 cm spacing. Apply farmyard manure before sowing.', 'First irrigation 20-25 days after sowing. Earthing up at 30 days. Control stem borer.', 2800, '₹1,500-₹1,800 per quintal'),
('Turmeric', 'kharif', ARRAY['Loamy', 'Clay Loam'], ARRAY['None'], ARRAY['Vegetables', 'Pulses'], 'Plant rhizomes in May-June. Requires well-drained soil with organic matter.', 'Mulch with green leaves. Irrigate regularly. Harvest after 7-9 months when leaves turn yellow.', 6000, '₹6,000-₹8,000 per quintal'),
('Red Gram (Pigeon Pea)', 'kharif', ARRAY['Black', 'Red', 'Loamy'], ARRAY['Maize', 'Sorghum'], ARRAY['Wheat', 'Chickpea'], 'Sow with onset of monsoon. Spacing 90x30 cm. Use rhizobium culture.', 'One or two irrigations at flowering. Spray for pod borer. Harvest when 75% pods mature.', 900, '₹5,500-₹7,000 per quintal'),
('Green Gram (Moong)', 'kharif', ARRAY['Loamy', 'Sandy Loam'], ARRAY['None'], ARRAY['Wheat', 'Mustard'], 'Short duration crop (60-70 days). Sow in lines 30x10 cm.', 'Light irrigation. Rhizobium seed treatment. Control yellow mosaic virus.', 500, '₹6,000-₹7,500 per quintal'),
('Soybean', 'kharif', ARRAY['Black', 'Red Loamy'], ARRAY['Maize'], ARRAY['Wheat', 'Chickpea'], 'Sow within first fortnight of monsoon. Spacing 45x5 cm. Seed treatment with rhizobium.', 'Drain excess water. Control defoliators. Harvest when leaves turn yellow and drop.', 1200, '₹3,500-₹4,500 per quintal'),
('Wheat', 'rabi', ARRAY['Loamy', 'Clay Loam'], ARRAY['Chickpea', 'Mustard'], ARRAY['Rice', 'Maize'], 'Sow in November. Line sowing with 20-22 cm row spacing. Use certified seeds.', 'Irrigate at crown root, tillering, flowering and grain filling. Control aphids and rust.', 2200, '₹1,900-₹2,100 per quintal'),
('Chickpea (Chana)', 'rabi', ARRAY['Black', 'Clay Loam'], ARRAY['Wheat', 'Barley'], ARRAY['Rice', 'Maize'], 'Sow in October-November. Spacing 30x10 cm. Seed treatment with rhizobium.', 'One irrigation at flowering critical. Control pod borer. No water at maturity stage.', 800, '₹4,500-₹5,500 per quintal'),
('Mustard', 'rabi', ARRAY['Loamy', 'Sandy Loam'], ARRAY['Chickpea'], ARRAY['Rice', 'Maize'], 'Sow in October. Broadcasting or line sowing. Apply sulphur for better yield.', 'Irrigate at branching and flowering. Control aphids. Harvest when pods turn brown.', 700, '₹4,000-₹5,000 per quintal');

-- Insert sample storage facilities
INSERT INTO public.storage_facilities (name, type, location, district, capacity_tonnes, contact_phone, facilities) VALUES
('Warangal Central Godown', 'government_godown', 'Station Road, Warangal', 'Warangal Urban', 5000, '0870-2578900', ARRAY['Pest Control', 'Loading Equipment', 'Security']),
('Khammam Agricultural Warehouse', 'government_godown', 'Agricultural Market, Khammam', 'Khammam', 3500, '08742-232100', ARRAY['Ventilation', 'Moisture Control', 'Security']),
('Adilabad District Cold Storage', 'cold_storage', 'Industrial Area, Adilabad', 'Adilabad', 2000, '08732-222300', ARRAY['Temperature Control', 'Cold Chambers', 'Loading Bay']),
('Nizamabad Private Warehouse', 'private_warehouse', 'NH 44, Nizamabad', 'Nizamabad', 4000, '08462-233450', ARRAY['24x7 Access', 'CCTV', 'Fumigation']),
('Karimnagar FCI Godown', 'government_godown', 'FCI Complex, Karimnagar', 'Karimnagar', 6000, '0878-2225600', ARRAY['Quality Testing', 'Modern Equipment', 'Rail Connectivity']);