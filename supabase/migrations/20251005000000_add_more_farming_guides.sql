-- Add more comprehensive farming guides

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
  'Tomato Cultivation Complete Guide',
  'Complete guide for tomato cultivation from seed to harvest. Learn hybrid variety selection, staking, and disease management.',
  'Tomato',
  'complete',
  'beginner',
  90,
  'rabi',
  '[
    {
      "step_number": 1,
      "title": "Nursery Raising",
      "description": "Sow seeds in pro-trays or raised beds. Use sterilized potting mix. Cover with thin soil layer and water gently. Seeds germinate in 5-7 days.",
      "duration_minutes": 60,
      "tips": ["Use hybrid varieties for better yield", "Treat seeds with Trichoderma", "Maintain 25-30°C temperature"]
    },
    {
      "step_number": 2,
      "title": "Land Preparation",
      "description": "Deep plowing 2-3 times. Add 20-25 tons FYM per acre. Make raised beds of 15-20 cm height for good drainage.",
      "duration_minutes": 240,
      "tips": ["Ensure good drainage system", "Incorporate neem cake", "Maintain pH 6.0-7.0"]
    },
    {
      "step_number": 3,
      "title": "Transplanting",
      "description": "Transplant 25-30 days old seedlings. Spacing: 75 x 60 cm for hybrids, 60 x 45 cm for open pollinated. Plant during evening hours.",
      "duration_minutes": 180,
      "tips": ["Water transplants immediately", "Provide shade for 2-3 days", "Gap filling within a week"]
    },
    {
      "step_number": 4,
      "title": "Staking & Pruning",
      "description": "Install bamboo/wooden stakes within 15 days. Tie plants loosely at intervals. Remove side shoots for determinate varieties.",
      "duration_minutes": 120,
      "tips": ["Stakes should be 5-6 feet tall", "Use soft cloth for tying", "Prune lower leaves touching ground"]
    },
    {
      "step_number": 5,
      "title": "Fertigation Schedule",
      "description": "Apply NPK through drip at regular intervals. Increase potash during fruiting. Use calcium and boron sprays to prevent blossom end rot.",
      "duration_minutes": 45,
      "tips": ["Split fertilizer application", "Monitor EC of fertigation solution", "Apply micronutrients as foliar spray"]
    },
    {
      "step_number": 6,
      "title": "Disease Management",
      "description": "Monitor for early blight, late blight, and leaf curl virus. Use resistant varieties. Apply preventive fungicide sprays.",
      "duration_minutes": 90,
      "tips": ["Remove diseased plants immediately", "Control whitefly for virus prevention", "Use sticky traps"]
    },
    {
      "step_number": 7,
      "title": "Harvesting",
      "description": "First harvest after 60-70 days. Pick fruits at pink stage for distant markets, red ripe for local. Harvest every 2-3 days.",
      "duration_minutes": 120,
      "tips": ["Harvest during morning hours", "Handle fruits carefully", "Store in cool place"]
    }
  ]'::jsonb,
  ARRAY['Spade', 'Pro-trays', 'Stakes', 'Drip System', 'Sprayer', 'Pruning Scissors'],
  35000.00,
  'Expected yield of 25-30 tons per acre. High quality fruits suitable for fresh market and processing.',
  ARRAY['Overwatering causes root rot', 'Dense planting increases disease', 'Calcium deficiency causes blossom end rot', 'Late staking damages roots'],
  ARRAY['Use mulching to conserve moisture', 'Intercrop with marigold for pest control', 'Apply reflective mulch to repel aphids', 'Harvest at right maturity for better shelf life'],
  true
),
(
  'Organic Pest Management Guide',
  'Chemical-free pest control methods using botanical extracts, biological control, and cultural practices.',
  'All Crops',
  'maintenance',
  'intermediate',
  21,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Neem Oil Spray Preparation",
      "description": "Mix 5ml neem oil with 1 liter water. Add 1ml liquid soap as emulsifier. Prepare fresh solution each time.",
      "duration_minutes": 30,
      "tips": ["Use cold-pressed neem oil", "Spray during evening hours", "Covers aphids, whitefly, mites"]
    },
    {
      "step_number": 2,
      "title": "Panchagavya Preparation",
      "description": "Mix cow dung, urine, milk, curd, and ghee in specific ratios. Ferment for 15 days. Dilute 30ml per liter for spray.",
      "duration_minutes": 90,
      "tips": ["Stir daily during fermentation", "Acts as growth promoter", "Improves plant immunity"]
    },
    {
      "step_number": 3,
      "title": "Trap Crops & Border Crops",
      "description": "Plant marigold around field border. Use mustard as trap crop for aphids. Install yellow sticky traps.",
      "duration_minutes": 120,
      "tips": ["Plant trap crops 2 weeks before main crop", "Monitor and destroy trapped pests", "Attracts beneficial insects"]
    },
    {
      "step_number": 4,
      "title": "Biological Control Release",
      "description": "Release Trichogramma cards for borer control. Use predatory mites for spider mites. Release Chrysoperla for aphids.",
      "duration_minutes": 45,
      "tips": ["Time release as per pest appearance", "Release during evening", "Avoid pesticide use for 15 days"]
    },
    {
      "step_number": 5,
      "title": "Botanical Extract Sprays",
      "description": "Prepare garlic-chili-neem spray. Use tobacco decoction for aphids. Apply custard apple seed powder for caterpillars.",
      "duration_minutes": 60,
      "tips": ["Test on few plants first", "Spray covers both sides of leaves", "Repeat at 7 day interval"]
    }
  ]'::jsonb,
  ARRAY['Sprayer', 'Measuring Cup', 'Plastic Containers', 'Yellow Sticky Traps', 'Grinder'],
  5000.00,
  'Effective pest control without chemical residues. Improved soil health and beneficial insect population. Safe produce for consumers.',
  ARRAY['Using only one method is insufficient', 'Late intervention when pest population high', 'Not monitoring regularly', 'Ignoring cultural practices'],
  ARRAY['Combine multiple methods for better results', 'Prevent rather than cure', 'Maintain field hygiene', 'Use pheromone traps for monitoring'],
  true
),
(
  'Wheat Cultivation Guide',
  'High-yielding wheat cultivation techniques for rabi season. Varieties, sowing methods, and nutrient management.',
  'Wheat',
  'complete',
  'beginner',
  120,
  'rabi',
  '[
    {
      "step_number": 1,
      "title": "Variety Selection",
      "description": "Choose varieties based on sowing time and irrigation. Early varieties for late sowing. Use certified seeds @ 50 kg/acre.",
      "duration_minutes": 30,
      "tips": ["HD-2967, PBW-343 for irrigated areas", "Lok-1, HI-1544 for rainfed", "Treat seeds with Vitavax"]
    },
    {
      "step_number": 2,
      "title": "Land Preparation",
      "description": "One deep plowing followed by 2-3 shallow plowings. Level land properly. Make irrigation channels.",
      "duration_minutes": 300,
      "tips": ["Add 8-10 tons FYM before plowing", "Ensure fine tilth", "Remove stubbles of previous crop"]
    },
    {
      "step_number": 3,
      "title": "Sowing Method",
      "description": "Sow by seed drill in rows 20-23 cm apart. Sowing depth 4-5 cm. Timely sowing (Nov 1-15) gives best yield.",
      "duration_minutes": 180,
      "tips": ["Zero-till drill saves time and cost", "Line sowing better than broadcasting", "Pre-sowing irrigation if soil dry"]
    },
    {
      "step_number": 4,
      "title": "Irrigation Schedule",
      "description": "First irrigation 20-25 days after sowing (crown root initiation). Total 5-6 irrigations at critical stages.",
      "duration_minutes": 120,
      "tips": ["CRI, tillering, jointing, flowering, milk, dough stages need water", "Avoid irrigation during grain hardening", "Light frequent irrigation better"]
    },
    {
      "step_number": 5,
      "title": "Fertilizer Management",
      "description": "Apply 120:60:40 NPK per acre. 50% N and full PK at sowing. Remaining N in 2 splits at CRI and heading.",
      "duration_minutes": 90,
      "tips": ["Zinc application improves yield", "Use neem coated urea", "Foliar spray of DAP at grain filling"]
    },
    {
      "step_number": 6,
      "title": "Weed Control",
      "description": "Pre-emergence herbicide after first irrigation. One manual weeding if needed. Keep field weed-free for first 40 days.",
      "duration_minutes": 180,
      "tips": ["Use 2,4-D for broad leaf weeds", "Clodinafop for grass weeds", "Manual weeding 30-35 DAS"]
    },
    {
      "step_number": 7,
      "title": "Harvesting & Threshing",
      "description": "Harvest at physiological maturity (grains hard, golden yellow). Cut close to ground. Thresh within 3-4 days.",
      "duration_minutes": 360,
      "tips": ["Harvest at 20-22% moisture", "Combine harvester for large areas", "Dry to 12% moisture for storage"]
    }
  ]'::jsonb,
  ARRAY['Seed Drill', 'Combine Harvester', 'Thresher', 'Sprayer'],
  18000.00,
  'Expected yield of 20-25 quintals per acre in irrigated conditions. Quality grain suitable for milling.',
  ARRAY['Late sowing reduces yield', 'Over-irrigation at maturity causes lodging', 'Insufficient weed control', 'Delayed harvesting causes grain shattering'],
  ARRAY['Happy Seeder for zero-till after rice', 'Raised bed planting saves water', 'Use recommended seed rate', 'Monitor for rust and aphids'],
  true
),
(
  'Vegetable Integrated Nutrient Management',
  'Balanced nutrition for vegetables using organic and inorganic sources. Soil testing and fertilizer scheduling.',
  'Vegetables',
  'maintenance',
  'intermediate',
  90,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Soil Testing",
      "description": "Collect soil samples from 6-8 spots at 0-15 cm depth. Mix thoroughly and send 500g to lab. Get NPK, pH, EC, and micronutrient analysis.",
      "duration_minutes": 90,
      "tips": ["Test before each season", "Collect from root zone", "Avoid contamination with fertilizer bags"]
    },
    {
      "step_number": 2,
      "title": "Organic Matter Application",
      "description": "Apply 10 tons FYM or 5 tons compost per acre. Add 2-3 weeks before planting. Mix well with soil.",
      "duration_minutes": 240,
      "tips": ["Well decomposed FYM only", "Vermicompost for high value crops", "Enriched compost better than plain"]
    },
    {
      "step_number": 3,
      "title": "Basal Fertilizer Application",
      "description": "Apply full P, K and 25% N as basal. Mix with soil at time of bed preparation. Use complex fertilizers for uniform distribution.",
      "duration_minutes": 60,
      "tips": ["Band placement near root zone", "Avoid direct seed contact", "Water after application"]
    },
    {
      "step_number": 4,
      "title": "Split Nitrogen Application",
      "description": "Apply remaining 75% N in 3-4 splits at 15 day intervals. Adjust based on crop growth. Top dress and water immediately.",
      "duration_minutes": 45,
      "tips": ["More splits for leafy vegetables", "Avoid N during fruit ripening", "Use urea for quick response"]
    },
    {
      "step_number": 5,
      "title": "Micronutrient Management",
      "description": "Apply zinc, boron, iron as per soil test. Foliar application more effective. Use chelated forms for better absorption.",
      "duration_minutes": 30,
      "tips": ["Spray during morning or evening", "Add wetting agent", "Multiple sprays at 15 day interval"]
    },
    {
      "step_number": 6,
      "title": "Bio-Fertilizer Application",
      "description": "Use Azotobacter, PSB, and KMB for nitrogen fixation and nutrient solubilization. Apply near root zone. Mix with FYM for better results.",
      "duration_minutes": 45,
      "tips": ["Store bio-fertilizers in cool place", "Use before expiry", "Apply during evening"]
    }
  ]'::jsonb,
  ARRAY['Soil Sampling Kit', 'Spreader', 'Sprayer', 'Measuring Cup'],
  12000.00,
  'Balanced plant nutrition resulting in higher yield and quality. Improved soil health and reduced fertilizer cost by 20-30%.',
  ARRAY['Ignoring soil test leads to imbalanced nutrition', 'Using only chemical fertilizers degrades soil', 'Not applying micronutrients', 'Broadcasting instead of band placement'],
  ARRAY['Use slow release fertilizers for steady nutrition', 'Combine organic with inorganic', 'Leaf color chart for N monitoring', 'Fertigation for efficient use'],
  false
),
(
  'Green Gram (Moong) Cultivation',
  'Short duration pulse crop cultivation. Ideal for summer season and as intercrop. Nitrogen fixing and soil improving.',
  'Green Gram',
  'complete',
  'beginner',
  65,
  'summer',
  '[
    {
      "step_number": 1,
      "title": "Variety & Seed Treatment",
      "description": "Select short duration varieties like Pusa Vishal, IPM-2-3. Use 8-10 kg seeds per acre. Treat with Rhizobium and PSB.",
      "duration_minutes": 45,
      "tips": ["Avoid damaged seeds", "Germination should be >70%", "Bio-fertilizer increases yield"]
    },
    {
      "step_number": 2,
      "title": "Sowing",
      "description": "Sow in rows 30 cm apart, 10 cm plant to plant. Depth 3-4 cm. Can be sown by seed drill or desi plow.",
      "duration_minutes": 120,
      "tips": ["Ensure soil moisture before sowing", "Summer crop needs pre-sowing irrigation", "Timely sowing crucial for yield"]
    },
    {
      "step_number": 3,
      "title": "Irrigation",
      "description": "2-3 irrigations in summer. First irrigation 20-25 DAS at flowering. Second at pod formation stage.",
      "duration_minutes": 90,
      "tips": ["Critical stages: flowering and pod filling", "Avoid water logging", "One post-sowing light irrigation helpful"]
    },
    {
      "step_number": 4,
      "title": "Weed Management",
      "description": "One hand weeding 20-25 DAS. Or use pre-emergence herbicide. Keep weed-free for first 30 days.",
      "duration_minutes": 120,
      "tips": ["Early weeding important", "Avoid deep hoeing near plants", "Mulching reduces weeds"]
    },
    {
      "step_number": 5,
      "title": "Pest Control",
      "description": "Monitor for pod borer, whitefly, and yellow mosaic virus. Use neem oil spray. Install pheromone traps.",
      "duration_minutes": 60,
      "tips": ["Yellow mosaic spread by whitefly", "Control whitefly from beginning", "Use resistant varieties"]
    },
    {
      "step_number": 6,
      "title": "Harvesting",
      "description": "Harvest when 80% pods turn brown/black. Cut plants close to ground. Thresh after sun drying for 3-4 days.",
      "duration_minutes": 180,
      "tips": ["Harvest at proper maturity", "Bundle and stack for drying", "Avoid shattering losses"]
    }
  ]'::jsonb,
  ARRAY['Seed Drill', 'Hoe', 'Sickle', 'Thresher'],
  8000.00,
  'Expected yield of 4-6 quintals per acre. Quick returns in 60-65 days. Enriches soil with nitrogen.',
  ARRAY['Early or late sowing reduces yield', 'Ignoring pod borer control', 'Delayed harvesting causes shattering', 'Not treating seeds with Rhizobium'],
  ARRAY['Excellent catch crop', 'Good for crop rotation', 'Can be grown as intercrop', 'Summer crop gives better prices'],
  false
),
(
  'Mulching Techniques for Water Conservation',
  'Different mulching methods to conserve soil moisture, control weeds, and improve yield. Organic and plastic mulching.',
  'All Crops',
  'preparation',
  'beginner',
  14,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Organic Mulch Materials",
      "description": "Collect crop residues, dry leaves, straw, or grass. Chop into 2-3 inch pieces. Need 2-3 tons per acre.",
      "duration_minutes": 180,
      "tips": ["Use disease-free materials", "Mix different materials", "Aged mulch better than fresh"]
    },
    {
      "step_number": 2,
      "title": "Plastic Mulch Selection",
      "description": "Choose 25-30 micron thickness for vegetables. Black mulch for weed control. Silver/reflective mulch for aphid control.",
      "duration_minutes": 60,
      "tips": ["Calculate required length", "Buy quality material", "Biodegradable mulch available now"]
    },
    {
      "step_number": 3,
      "title": "Land & Bed Preparation",
      "description": "Prepare raised beds with proper slope. Install drip lines. Make soil surface smooth. Remove stones and clods.",
      "duration_minutes": 240,
      "tips": ["Bed height 15-20 cm", "Top width 60-90 cm", "Furrow for drainage"]
    },
    {
      "step_number": 4,
      "title": "Plastic Mulch Laying",
      "description": "Lay mulch film on prepared beds. Bury edges in soil. Make planting holes with proper spacing. Ensure tight fitting.",
      "duration_minutes": 120,
      "tips": ["Work during cool hours", "Avoid wrinkles", "Use mulch laying machine for large area"]
    },
    {
      "step_number": 5,
      "title": "Organic Mulch Application",
      "description": "Spread mulch 3-4 inches thick around plants. Keep 2-3 inches away from stem. Replenish as it decomposes.",
      "duration_minutes": 90,
      "tips": ["Apply after first weeding", "More depth for weed control", "Decomposed mulch adds nutrients"]
    },
    {
      "step_number": 6,
      "title": "Maintenance",
      "description": "Check for pest hiding. Repair torn plastic mulch. Add more organic mulch periodically. Remove plastic after harvest.",
      "duration_minutes": 60,
      "tips": ["Regular monitoring needed", "Proper disposal of plastic", "Organic mulch improves soil"]
    }
  ]'::jsonb,
  ARRAY['Chopper', 'Plastic Mulch Film', 'Mulch Laying Machine', 'Punching Tool'],
  15000.00,
  'Water saving of 30-40%. Weed control up to 80%. 15-20% yield increase. Reduced fruit rot in vegetables.',
  ARRAY['Too thick organic mulch invites pests', 'Poor quality plastic tears easily', 'Not removing plastic causes soil pollution', 'Applying fresh residues causes nitrogen tie-up'],
  ARRAY['Combine with drip irrigation', 'Use locally available materials', 'Collect and reuse plastic mulch', 'Living mulch with cover crops'],
  false
),
(
  'Banana High-Density Planting System',
  'Modern banana cultivation with tissue culture plants. High-density planting for increased profitability.',
  'Banana',
  'complete',
  'advanced',
  365,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Tissue Culture Plant Procurement",
      "description": "Order tissue culture plants from certified nursery. Select varieties like Grand Naine, Robusta. Need 1800-2000 plants per acre.",
      "duration_minutes": 120,
      "tips": ["Order 2 months in advance", "Check for healthy growing points", "Hardened plants better"]
    },
    {
      "step_number": 2,
      "title": "Land Preparation & Pit Digging",
      "description": "Deep plowing and leveling. Dig pits of 60x60x60 cm. Fill with FYM, topsoil, and single super phosphate mixture.",
      "duration_minutes": 480,
      "tips": ["Spacing: 6x6 feet or 6x4 feet", "Add Trichoderma in pit", "Maintain proper drainage"]
    },
    {
      "step_number": 3,
      "title": "Planting",
      "description": "Plant during monsoon or with irrigation. Remove polythene bag carefully. Plant at same depth as in bag. Press soil firmly.",
      "duration_minutes": 360,
      "tips": ["Avoid root damage", "Water immediately after planting", "Provide shade for 1 week"]
    },
    {
      "step_number": 4,
      "title": "Irrigation & Fertigation",
      "description": "Install drip system. Water daily in summer. Fertigation schedule: increase nutrients during 3-6 months. High potash at flowering.",
      "duration_minutes": 60,
      "tips": ["Basin irrigation if no drip", "Never water log", "Calcium for quality fruit"]
    },
    {
      "step_number": 5,
      "title": "Desuckering",
      "description": "Allow only one follower sucker. Remove others regularly. Maintain mat with 3 generations: parent, follower, grandchild.",
      "duration_minutes": 90,
      "tips": ["Use sharp tool", "Remove at ground level", "Regular desuckering important"]
    },
    {
      "step_number": 6,
      "title": "Propping & Bunch Management",
      "description": "Prop plants when bunch appears. Remove male bud after last hand. Cover bunch with blue polythene. Apply ethephon for uniform ripening.",
      "duration_minutes": 120,
      "tips": ["Bamboo props on windy side", "Remove odd hands", "Regular inspection for pests"]
    },
    {
      "step_number": 7,
      "title": "Harvesting",
      "description": "Harvest at 75-80% maturity for distant markets. 90-100% for local. Cut bunch with 30 cm stem. Handle carefully to avoid bruising.",
      "duration_minutes": 240,
      "tips": ["Harvest during cool hours", "Use cushioned vehicles", "First harvest at 11-12 months"]
    }
  ]'::jsonb,
  ARRAY['Spade', 'Drip System', 'Bamboo Props', 'Knife', 'Bunch Covers'],
  150000.00,
  'Expected yield of 40-50 tons per acre. High quality fruits. Continuous income from ratoon crops. Premium price for tissue culture banana.',
  ARRAY['Panama wilt in disease-prone areas', 'Water stress during summer reduces yield', 'Not desuckering increases competition', 'Harvesting immature fruits affects quality'],
  ARRAY['Mulching highly beneficial', 'Intercrop with vegetables initially', 'Export quality needs more care', 'Insurance recommended for high investment'],
  true
),
(
  'Integrated Disease Management in Vegetables',
  'Holistic approach to manage vegetable diseases. Combining cultural, biological, and chemical methods.',
  'Vegetables',
  'maintenance',
  'intermediate',
  90,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Disease-Free Seed & Resistant Varieties",
      "description": "Use certified disease-free seeds. Choose resistant varieties for major diseases. Treat seeds with Trichoderma or Pseudomonas.",
      "duration_minutes": 45,
      "tips": ["Hot water treatment for some seeds", "Bioagents better than chemicals", "Check seed health certificate"]
    },
    {
      "step_number": 2,
      "title": "Soil Solarization",
      "description": "Cover moist soil with transparent polyethylene for 4-6 weeks in summer. Kills soil-borne pathogens, nematodes, and weed seeds.",
      "duration_minutes": 180,
      "tips": ["Temperature should reach 45-50°C", "Remove crop residues before", "Most effective in May-June"]
    },
    {
      "step_number": 3,
      "title": "Crop Rotation & Sanitation",
      "description": "Avoid same crop family for 2-3 years. Remove and destroy diseased plants immediately. Clean tools between plants.",
      "duration_minutes": 120,
      "tips": ["Rotate with non-host crops", "Burn diseased material away from field", "Maintain field hygiene"]
    },
    {
      "step_number": 4,
      "title": "Biocontrol Application",
      "description": "Apply Trichoderma viride in soil @ 5kg/acre. Spray Pseudomonas for foliar diseases. Use at 15 day intervals.",
      "duration_minutes": 60,
      "tips": ["Mix with FYM before application", "Avoid mixing with chemical fungicides", "Effective if applied early"]
    },
    {
      "step_number": 5,
      "title": "Botanical Extracts",
      "description": "Use garlic extract, neem cake, or turmeric powder for disease control. Prepare fresh extracts. Apply as spray or soil drench.",
      "duration_minutes": 90,
      "tips": ["Test on small area first", "Works better as preventive", "Add spreader-sticker"]
    },
    {
      "step_number": 6,
      "title": "Chemical Control (Last Resort)",
      "description": "Use systemic fungicides only when disease severity high. Rotate between different groups. Follow waiting period.",
      "duration_minutes": 45,
      "tips": ["Use as per recommendation", "Alternate modes of action", "Wear protective equipment"]
    }
  ]'::jsonb,
  ARRAY['Sprayer', 'Transparent Polyethylene Sheet', 'Pruning Tools', 'Safety Equipment'],
  8000.00,
  'Disease incidence reduced by 60-80%. Better quality produce with minimal chemical residues. Improved soil health and plant vigor.',
  ARRAY['Using only chemical control leads to resistance', 'Ignoring cultural practices', 'Late detection and action', 'Not removing disease source'],
  ARRAY['Prevention better than cure', 'Combine multiple methods', 'Regular monitoring essential', 'Maintain field records'],
  false
),
(
  'Pomegranate Orchard Management',
  'Complete guide for pomegranate cultivation from planting to fruiting. Pruning, bahar management, and quality improvement.',
  'Pomegranate',
  'complete',
  'advanced',
  730,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Planting",
      "description": "Plant grafted saplings during July-August or February-March. Spacing 12x12 feet (300 plants/acre). Dig 2x2x2 feet pits.",
      "duration_minutes": 360,
      "tips": ["Fill pit with FYM + soil mixture", "Plant at same level as nursery", "Stake young plants"]
    },
    {
      "step_number": 2,
      "title": "Training & Pruning",
      "description": "Develop 3-4 main branches at 2 feet height. Remove suckers regularly. Light pruning after each harvest to maintain shape.",
      "duration_minutes": 120,
      "tips": ["Create umbrella shape canopy", "Remove dead and diseased wood", "Avoid excessive pruning"]
    },
    {
      "step_number": 3,
      "title": "Bahar Regulation",
      "description": "Select hasta or ambe bahar based on market. Give stress for 45 days by withholding irrigation. Follow with fertilizer and irrigation.",
      "duration_minutes": 60,
      "tips": ["Hasta bahar gives Diwali harvest", "Ambe bahar for summer harvest", "Weather matters for bahar"]
    },
    {
      "step_number": 4,
      "title": "Fertigation Program",
      "description": "Year 1: 100g N per plant. Increase by 100g each year up to 5th year. Apply through drip. High potash during fruiting.",
      "duration_minutes": 45,
      "tips": ["Weekly fertigation best", "Calcium prevents fruit cracking", "Boron for fruit set"]
    },
    {
      "step_number": 5,
      "title": "Disease & Pest Management",
      "description": "Major diseases: bacterial blight, wilt. Pests: fruit borer, aphids. Use IPM approach. Bag fruits for quality production.",
      "duration_minutes": 120,
      "tips": ["Bordeaux paste on trunk for blight", "Fruit bagging 45 days after fruit set", "Regular scouting important"]
    },
    {
      "step_number": 6,
      "title": "Fruit Thinning & Quality",
      "description": "Remove malformed, diseased, and extra fruits. Keep 100-125 fruits per plant. This improves fruit size and quality.",
      "duration_minutes": 180,
      "tips": ["Thin when fruits marble size", "Uniform sized fruits preferred", "Remove fruits on weak branches"]
    },
    {
      "step_number": 7,
      "title": "Harvesting & Post-Harvest",
      "description": "Harvest when fruits fully colored. Pick with stalk and 2-3 leaves. Sort by size and quality. Store in cool place.",
      "duration_minutes": 240,
      "tips": ["Use secateurs for cutting", "Handle carefully to avoid bruising", "Grade: Super, A, B, C"]
    }
  ]'::jsonb,
  ARRAY['Drip System', 'Pruning Tools', 'Sprayer', 'Fruit Bags', 'Secateurs'],
  200000.00,
  'Expected yield 8-10 tons from 3rd year onwards. Premium prices for quality graded fruits. Export potential with proper management.',
  ARRAY['Poor drainage causes wilt', 'Irregular irrigation causes fruit cracking', 'Ignoring bacterial blight leads to tree death', 'Not regulating bahar affects yield'],
  ARRAY['Insurance must for high investment', 'Drip irrigation mandatory', 'Export market needs certification', 'Contract farming gaining popularity'],
  true
),
(
  'Vermicompost Production Unit',
  'Set up small-scale vermicompost production. Convert organic waste into valuable bio-fertilizer. Additional income source.',
  'All Crops',
  'preparation',
  'beginner',
  90,
  'all',
  '[
    {
      "step_number": 1,
      "title": "Earthworm Species Selection",
      "description": "Eisenia fetida (red worms) best for composting. Procure 1 kg worms for 10x3x1 feet bed. Buy from certified source.",
      "duration_minutes": 60,
      "tips": ["Red worms work fastest", "African night crawlers for field release", "Check worm health before buying"]
    },
    {
      "step_number": 2,
      "title": "Vermibed Construction",
      "description": "Make cement or mud beds of 10x3x1 feet (can vary). Provide shade with coconut leaves. Ensure drainage holes at bottom.",
      "duration_minutes": 360,
      "tips": ["Multiple smaller beds better than one large", "Provide 50% shade", "Water channel for moisture"]
    },
    {
      "step_number": 3,
      "title": "Bedding Material Preparation",
      "description": "Spread 3 inches partially decomposed cow dung. Add 1 inch soil layer. Sprinkle water to maintain moisture.",
      "duration_minutes": 90,
      "tips": ["Bedding should be moist not wet", "No chemical contamination", "pH 6.5-7.5 ideal"]
    },
    {
      "step_number": 4,
      "title": "Worm Release & Feeding",
      "description": "Release worms on bedding. Cover with wet gunny bags. Add feed (cattle dung, crop residues) in thin layers weekly.",
      "duration_minutes": 60,
      "tips": ["Avoid fresh cattle dung", "Feed only after previous layer consumed", "Chop materials to small pieces"]
    },
    {
      "step_number": 5,
      "title": "Maintenance",
      "description": "Maintain moisture like squeezed sponge. Turn gently once in 15 days. Check for ants and other predators. Protect from direct sun and rain.",
      "duration_minutes": 45,
      "tips": ["Worms die if too dry or too wet", "Neem cake deters ants", "Temperature 20-30°C ideal"]
    },
    {
      "step_number": 6,
      "title": "Harvesting Vermicompost",
      "description": "Ready in 60-90 days. Stop feeding 7 days before harvest. Compost is dark brown, crumbly, odorless. Separate worms by light method.",
      "duration_minutes": 180,
      "tips": ["Worms move down in pyramid when exposed to light", "Sieve to remove egg capsules", "Store in shade"]
    },
    {
      "step_number": 7,
      "title": "Marketing & Value Addition",
      "description": "Pack in bags of 5, 10, 50 kg. Maintain quality consistency. Prepare liquid extract for premium market. Maintain supply records.",
      "duration_minutes": 120,
      "tips": ["Register as organic input supplier", "Sell worms separately", "Vermi-wash has good demand"]
    }
  ]'::jsonb,
  ARRAY['Cement/Bricks for Beds', 'Gunny Bags', 'Sieve', 'Weighing Scale', 'Packaging Bags'],
  25000.00,
  'One bed produces 300-400 kg vermicompost every 3 months. Selling at Rs.10-15/kg. Additional income from worm sale. Low input sustainable business.',
  ARRAY['Temperature extremes kill worms', 'Overfeeding causes bad smell', 'Water logging kills worms', 'Chemical contamination toxic to worms'],
  ARRAY['Start small and expand', 'Use farm waste as input', 'Certification adds value', 'Training programs available from KVKs'],
  false
);
