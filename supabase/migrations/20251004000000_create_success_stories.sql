-- Create success_stories table
CREATE TABLE public.success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_name TEXT NOT NULL,
  village TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT DEFAULT 'Telangana',
  age INTEGER,
  photo_url TEXT,
  story_title TEXT NOT NULL,
  story_content TEXT NOT NULL,
  crops_grown TEXT[] NOT NULL, -- array of crop names
  land_size_acres DECIMAL(10,2),
  previous_yield_kg DECIMAL(10,2),
  current_yield_kg DECIMAL(10,2),
  yield_improvement_percentage DECIMAL(5,2),
  income_before DECIMAL(10,2),
  income_after DECIMAL(10,2),
  techniques_used TEXT[], -- array of farming techniques
  challenges_faced TEXT,
  solutions_implemented TEXT,
  advice_to_farmers TEXT,
  testimonial TEXT,
  is_featured BOOLEAN DEFAULT false,
  published_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on success_stories (public read)
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Success stories policies (public read for all authenticated users)
CREATE POLICY "Anyone can view success stories"
  ON public.success_stories FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert/update/delete (optional - for future admin panel)
-- For now, stories will be added manually or via admin interface

-- Add trigger for updated_at
CREATE TRIGGER update_success_stories_updated_at
  BEFORE UPDATE ON public.success_stories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample success stories
INSERT INTO public.success_stories (
  farmer_name,
  village,
  district,
  state,
  age,
  story_title,
  story_content,
  crops_grown,
  land_size_acres,
  previous_yield_kg,
  current_yield_kg,
  yield_improvement_percentage,
  income_before,
  income_after,
  techniques_used,
  challenges_faced,
  solutions_implemented,
  advice_to_farmers,
  testimonial,
  is_featured
) VALUES
(
  'Ramesh Kumar',
  'Eturnagaram',
  'Mulugu',
  'Telangana',
  45,
  'From Single Crop to Multi-Cropping Success',
  'Ramesh transformed his 5-acre farm by adopting multi-cropping techniques. Previously growing only paddy once a year, he now grows paddy, cotton, and pulses through strategic crop rotation and inter-cropping. This change increased his annual income by 180%.',
  ARRAY['Paddy', 'Cotton', 'Red Gram'],
  5.0,
  2500.0,
  7000.0,
  180.0,
  75000.0,
  210000.0,
  ARRAY['Multi-cropping', 'Drip Irrigation', 'Organic Fertilizers', 'Crop Rotation'],
  'Limited water availability and lack of knowledge about suitable crops for different seasons',
  'Installed drip irrigation system, attended training on multi-cropping, consulted with agriculture extension officers',
  'Don''t be afraid to try new techniques. Start small with one acre and gradually expand. Proper planning and water management are key to success.',
  'Multi-cropping changed my life. I can now grow 3 crops a year instead of 1. My children are getting better education with the increased income.',
  true
),
(
  'Lakshmi Bai',
  'Tadvai',
  'Mulugu',
  'Telangana',
  38,
  'Organic Farming: A Sustainable Success Story',
  'Lakshmi shifted from chemical-intensive farming to organic methods three years ago. Despite initial yield reduction, her crops now command premium prices in the market. Her soil health has improved significantly, and she has become a trainer for other women farmers.',
  ARRAY['Turmeric', 'Ginger', 'Vegetables'],
  3.5,
  1500.0,
  1800.0,
  20.0,
  60000.0,
  135000.0,
  ARRAY['Organic Farming', 'Vermicomposting', 'Natural Pest Control', 'Green Manure'],
  'Pest attacks increased initially after stopping pesticides, and finding organic fertilizer sources was difficult',
  'Created own vermicompost unit, used neem-based pest control, connected with organic farming groups for knowledge sharing',
  'Organic farming requires patience. The first year is challenging, but your soil becomes healthier. Premium prices for organic produce make it very profitable.',
  'My produce is healthier, my land is healthier, and I earn more. Plus, no more exposure to harmful chemicals. I encourage all farmers to go organic.',
  true
),
(
  'Venkat Rao',
  'Govindaraopet',
  'Mulugu',
  'Telangana',
  52,
  'Inter-cropping Cotton with Pulses: Doubled Income',
  'Venkat experimented with inter-cropping cotton with red gram and green gram. This combination not only improved soil nitrogen but also provided insurance against crop failure. His net profit increased by 150% compared to mono-cropping.',
  ARRAY['Cotton', 'Red Gram', 'Green Gram'],
  6.0,
  3000.0,
  7500.0,
  150.0,
  90000.0,
  225000.0,
  ARRAY['Inter-cropping', 'Soil Testing', 'Integrated Pest Management', 'Rainwater Harvesting'],
  'Uncertainty about which crops grow well together and fear of lower cotton yield',
  'Consulted agricultural scientists, did small-scale trials first, learned proper spacing techniques',
  'Inter-cropping reduces risk. Even if one crop fails, the other provides income. Pulses improve soil quality naturally.',
  'I was skeptical at first, but inter-cropping has proven to be a game-changer. My land is more productive throughout the year.',
  false
),
(
  'Anjali Devi',
  'Mangapet',
  'Mulugu',
  'Telangana',
  42,
  'Technology Adoption: GPS and Drip Irrigation Success',
  'Anjali embraced modern technology by installing GPS-guided drip irrigation and using mobile apps for crop monitoring. This precision farming approach reduced water usage by 40% while increasing yield by 35%. She now mentors other farmers on technology adoption.',
  ARRAY['Paddy', 'Maize', 'Vegetables'],
  4.0,
  2200.0,
  2970.0,
  35.0,
  88000.0,
  148000.0,
  ARRAY['Drip Irrigation', 'GPS Technology', 'Mobile App Monitoring', 'Weather Forecasting'],
  'High initial investment cost and lack of technical knowledge about modern equipment',
  'Took government subsidy for drip irrigation, attended training programs, formed farmer group for shared learning',
  'Technology is not scary. Once you learn, it makes farming easier and more profitable. Government subsidies help reduce costs.',
  'Drip irrigation saved my crops during drought. Mobile apps help me plan better. Technology is the future of farming.',
  false
);
