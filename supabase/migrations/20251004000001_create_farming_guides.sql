-- Create farming_guides table
CREATE TABLE public.farming_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guide_title TEXT NOT NULL,
  guide_description TEXT NOT NULL,
  crop_name TEXT NOT NULL,
  category TEXT NOT NULL, -- preparation, planting, maintenance, harvesting, post_harvest
  difficulty_level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced
  duration_days INTEGER,
  best_season TEXT, -- kharif, rabi, summer, all
  thumbnail_url TEXT,
  video_url TEXT,
  steps JSONB NOT NULL, -- array of {step_number, title, description, image_url, duration_minutes, tips}
  tools_required TEXT[],
  estimated_cost DECIMAL(10,2),
  expected_outcome TEXT,
  common_mistakes TEXT[],
  expert_tips TEXT[],
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on farming_guides (public read)
ALTER TABLE public.farming_guides ENABLE ROW LEVEL SECURITY;

-- Farming guides policies (public read for all authenticated users)
CREATE POLICY "Anyone can view farming guides"
  ON public.farming_guides FOR SELECT
  TO authenticated
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_farming_guides_updated_at
  BEFORE UPDATE ON public.farming_guides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample farming guides
INSERT INTO public.farming_guides (
  guide_title,
  guide_description,
  crop_name,
  category,
  difficulty_level,
  duration_days,
  best_season,
  steps,
  tools_required,
  estimated_cost,
  expected_outcome,
  common_mistakes,
  expert_tips,
  is_featured
) VALUES
(
  'Complete Paddy Cultivation Guide',
  'Step-by-step guide for paddy cultivation from land preparation to harvesting. Learn traditional and modern techniques for maximum yield.',
  'Paddy',
  'complete',
  'beginner',
  120,
  'kharif',
  '[
    {
      "step_number": 1,
      "title": "Land Preparation",
      "description": "Plow the field 2-3 times to achieve fine tilth. Level the land properly for uniform water distribution. Remove weeds and crop residues.",
      "duration_minutes": 180,
      "tips": ["Use tractor or power tiller for faster plowing", "Ensure proper drainage channels", "Add organic manure during last plowing"]
    },
    {
      "step_number": 2,
      "title": "Nursery Preparation",
      "description": "Prepare nursery beds of 1m width and convenient length. Apply well-decomposed farmyard manure. Sow pre-germinated seeds at 20-25g per sq meter.",
      "duration_minutes": 120,
      "tips": ["Select disease-free seeds", "Treat seeds with fungicide", "Maintain thin water layer in nursery"]
    },
    {
      "step_number": 3,
      "title": "Transplanting",
      "description": "Transplant 25-30 days old seedlings. Use 2-3 seedlings per hill. Maintain 20x15 cm spacing for high yielding varieties.",
      "duration_minutes": 360,
      "tips": ["Transplant during morning or evening", "Keep 2-3 cm water depth", "Use young and healthy seedlings"]
    },
    {
      "step_number": 4,
      "title": "Water Management",
      "description": "Maintain 2-5 cm water depth during vegetative stage. Drain field 7 days before harvesting. Critical stages need continuous water.",
      "duration_minutes": 30,
      "tips": ["Check water level daily", "Ensure proper drainage", "Avoid water stress during flowering"]
    },
    {
      "step_number": 5,
      "title": "Fertilizer Application",
      "description": "Apply NPK as per soil test. Split nitrogen application: 50% basal, 25% at tillering, 25% at panicle initiation.",
      "duration_minutes": 60,
      "tips": ["Apply fertilizers in standing water", "Use neem coated urea", "Apply zinc if deficiency observed"]
    },
    {
      "step_number": 6,
      "title": "Weed Control",
      "description": "First weeding 20-25 days after transplanting. Second weeding 40-45 days after transplanting. Use cono weeder or manual weeding.",
      "duration_minutes": 240,
      "tips": ["Early weeding gives better results", "Remove weeds before flowering", "Use mulching to suppress weeds"]
    },
    {
      "step_number": 7,
      "title": "Pest & Disease Management",
      "description": "Monitor regularly for pests. Use neem oil as preventive spray. Apply recommended pesticides only when threshold crossed.",
      "duration_minutes": 90,
      "tips": ["Use yellow sticky traps", "Encourage natural predators", "Avoid prophylactic pesticide use"]
    },
    {
      "step_number": 8,
      "title": "Harvesting",
      "description": "Harvest when 80% grains turn golden yellow. Cut crop close to ground. Thresh within 2-3 days to avoid losses.",
      "duration_minutes": 480,
      "tips": ["Harvest at 20-25% moisture", "Use combine harvester for large fields", "Dry grains to 12-14% moisture"]
    }
  ]'::jsonb,
  ARRAY['Tractor/Power Tiller', 'Leveler', 'Sprayer', 'Cono Weeder', 'Sickle', 'Thresher'],
  25000.00,
  'Expected yield of 4500-5500 kg per acre with proper management. Quality rice suitable for market.',
  ARRAY['Delayed transplanting reduces yield', 'Over-irrigation causes lodging', 'Ignoring pest monitoring leads to losses', 'Harvesting too early or late affects quality'],
  ARRAY['Use SRI method for water saving', 'Dapog method for quick nursery', 'Apply silicon for pest resistance', 'Use drum seeder to save labor'],
  true
),
(
  'Cotton Planting Guide',
  'Modern cotton planting techniques for high yield and quality fiber production.',
  'Cotton',
  'planting',
  'intermediate',
  30,
  'kharif',
  '[
    {
      "step_number": 1,
      "title": "Seed Selection & Treatment",
      "description": "Select high-yielding BT cotton varieties. Treat seeds with fungicide and insecticide. Use 1.5-2 kg seeds per acre.",
      "duration_minutes": 45,
      "tips": ["Buy certified seeds only", "Check seed germination before sowing", "Treat seeds 24 hours before planting"]
    },
    {
      "step_number": 2,
      "title": "Field Preparation",
      "description": "Deep plowing in summer. Make ridges and furrows. Apply basal dose of fertilizers.",
      "duration_minutes": 240,
      "tips": ["Maintain 90-120 cm row spacing", "45 cm plant to plant spacing", "Ensure good drainage"]
    },
    {
      "step_number": 3,
      "title": "Sowing",
      "description": "Sow seeds at 2-3 cm depth. Plant 2-3 seeds per hole. Thin to one healthy plant after 15 days.",
      "duration_minutes": 180,
      "tips": ["Sow after sufficient soil moisture", "Use dibbling method", "Gap filling within 10 days"]
    },
    {
      "step_number": 4,
      "title": "Early Stage Care",
      "description": "First irrigation after 3 weeks. Light hoeing to remove weeds. Monitor for early pests.",
      "duration_minutes": 120,
      "tips": ["Avoid water stress in early stage", "Remove alternate plants if too dense", "Use mulching between rows"]
    }
  ]'::jsonb,
  ARRAY['Seed Drill', 'Ridger', 'Sprayer', 'Hoe'],
  15000.00,
  'Healthy cotton plants with good establishment. Foundation for 12-15 quintals per acre yield.',
  ARRAY['Too deep sowing reduces germination', 'Dense planting causes competition', 'Early water stress affects growth'],
  ARRAY['Use inter-cropping with pulses', 'Apply neem cake for pest prevention', 'Maintain proper plant geometry'],
  true
),
(
  'Organic Composting for Healthy Soil',
  'Learn how to make nutrient-rich compost from farm waste. Improve soil health naturally.',
  'All Crops',
  'preparation',
  'beginner',
  60,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Material Collection",
      "description": "Collect green waste (crop residues, weeds) and brown waste (dry leaves, straw). Maintain 3:1 ratio of brown to green.",
      "duration_minutes": 90,
      "tips": ["Avoid diseased plant materials", "Chop materials to 2-3 inch pieces", "Include cow dung for faster decomposition"]
    },
    {
      "step_number": 2,
      "title": "Pit Preparation",
      "description": "Dig pit of 3m x 1m x 1m size. Line bottom with brick/stone for drainage. Ensure good air circulation.",
      "duration_minutes": 120,
      "tips": ["Choose shaded location", "Keep away from living areas", "Protect from heavy rain"]
    },
    {
      "step_number": 3,
      "title": "Layering",
      "description": "Layer brown and green materials alternately. Add thin layer of cow dung slurry. Sprinkle water to maintain moisture.",
      "duration_minutes": 60,
      "tips": ["Keep moisture like squeezed sponge", "Add handful of old compost", "Cover with straw"]
    },
    {
      "step_number": 4,
      "title": "Turning & Monitoring",
      "description": "Turn pile every 7-10 days. Check temperature (should be warm). Add water if too dry.",
      "duration_minutes": 30,
      "tips": ["Center should be warmest", "Bad smell means too wet", "Add lime if acidic"]
    },
    {
      "step_number": 5,
      "title": "Maturation",
      "description": "Compost ready in 45-60 days. Should be dark brown, crumbly. No bad odor, earthworms present.",
      "duration_minutes": 45,
      "tips": ["Sieve before use", "Store in dry place", "Use within 6 months"]
    }
  ]'::jsonb,
  ARRAY['Spade', 'Fork', 'Watering Can', 'Sieve', 'Wheelbarrow'],
  2000.00,
  'High-quality compost improving soil structure, water retention, and nutrient availability. One pit yields 500-700 kg compost.',
  ARRAY['Too wet causes bad smell', 'Too dry slows decomposition', 'Large pieces decompose slowly', 'Direct sun kills beneficial microbes'],
  ARRAY['Add bioculture for faster composting', 'Use vermicompost for higher quality', 'Keep separate pits for continuous supply', 'Mix with soil before application'],
  false
),
(
  'Drip Irrigation Installation',
  'Step-by-step guide to install and maintain drip irrigation system for water-efficient farming.',
  'All Crops',
  'maintenance',
  'intermediate',
  7,
  'all',
  '[
    {
      "step_number": 1,
      "title": "System Planning",
      "description": "Measure field area and water source capacity. Design layout with main and sub-main lines. Calculate emitter spacing based on crop.",
      "duration_minutes": 120,
      "tips": ["Get expert consultation for design", "Consider future expansion", "Plan for proper slope"]
    },
    {
      "step_number": 2,
      "title": "Material Procurement",
      "description": "Buy quality HDPE/LLDPE pipes. Purchase appropriate emitters (drippers). Get filters, valves, and connectors.",
      "duration_minutes": 180,
      "tips": ["Check for ISI certification", "Buy from authorized dealers", "Keep 10% extra materials"]
    },
    {
      "step_number": 3,
      "title": "Installation",
      "description": "Install main line from water source. Lay sub-mains and laterals. Fix drippers at specified spacing. Connect filters and valves.",
      "duration_minutes": 480,
      "tips": ["Bury main lines 30 cm deep", "Use proper pipe cutter", "Ensure leak-proof connections"]
    },
    {
      "step_number": 4,
      "title": "Testing & Adjustment",
      "description": "Test system at low pressure first. Check for leaks and blockages. Adjust pressure and flow rate. Verify uniform water distribution.",
      "duration_minutes": 120,
      "tips": ["Run system before planting", "Mark problematic areas", "Fine-tune pressure regulators"]
    },
    {
      "step_number": 5,
      "title": "Regular Maintenance",
      "description": "Clean filters weekly. Flush lines monthly. Check for clogging. Replace damaged parts promptly.",
      "duration_minutes": 60,
      "tips": ["Use acid treatment annually", "Monitor water quality", "Keep maintenance log"]
    }
  ]'::jsonb,
  ARRAY['Pipe Cutter', 'Punching Tool', 'Spanner Set', 'Measuring Tape', 'Shovel'],
  45000.00,
  'Complete drip irrigation system saving 40-60% water. Improved yield and reduced labor. Uniform water distribution throughout field.',
  ARRAY['Poor filter maintenance causes clogging', 'Wrong emitter spacing affects efficiency', 'Not flushing lines regularly', 'Using hard water without treatment'],
  ARRAY['Apply government subsidy (up to 55%)', 'Use fertigation for better results', 'Combine with mulching', 'Monitor soil moisture regularly'],
  false
);
