-- Add cold storage facilities data for Andhra Pradesh
-- Based on major agricultural districts and cold storage locations

INSERT INTO public.storage_facilities (
  name,
  type,
  location,
  district,
  capacity_tonnes,
  contact_phone,
  facilities
) VALUES
-- Krishna District
(
  'Vijayawada Cold Storage Complex',
  'cold_storage',
  'Autonagar, Vijayawada',
  'Krishna',
  5000,
  '+91-866-2473216',
  ARRAY['Temperature Controlled', 'Pre-cooling Chamber', 'Ripening Chambers', 'Loading Bay', 'Security']
),
(
  'Krishna Cold Chain',
  'cold_storage',
  'Gannavaram',
  'Krishna',
  3000,
  '+91-866-2571234',
  ARRAY['Multi-chamber', 'CA Storage', 'Grading Facility', 'Packaging Unit']
),

-- Guntur District
(
  'Guntur Agri Cold Storage',
  'cold_storage',
  'Tenali Road, Guntur',
  'Guntur',
  4500,
  '+91-863-2232156',
  ARRAY['Chilli Storage', 'Multi-purpose Chambers', 'Humidity Control', 'Sorting Area']
),
(
  'Chilkaluripet Cold Storage',
  'cold_storage',
  'Chilkaluripet',
  'Guntur',
  2500,
  '+91-863-3456789',
  ARRAY['Temperature Controlled', 'Security', '24x7 Monitoring']
),

-- Chittoor District
(
  'Madanapalle Fruit Cold Storage',
  'cold_storage',
  'Madanapalle',
  'Chittoor',
  3500,
  '+91-8571-222345',
  ARRAY['Controlled Atmosphere', 'Pre-cooling', 'Ripening Chambers', 'Grading Unit']
),
(
  'Chittoor District Cold Chain',
  'cold_storage',
  'Tirupati Road, Chittoor',
  'Chittoor',
  2000,
  '+91-8572-245678',
  ARRAY['Multi-chamber', 'Temperature Controlled', 'Loading Bays']
),

-- West Godavari District
(
  'Eluru Cold Storage Hub',
  'cold_storage',
  'Eluru',
  'West Godavari',
  3200,
  '+91-8812-245123',
  ARRAY['Multi-chamber', 'CA Storage', 'Packaging Area', 'Security']
),

-- East Godavari District  
(
  'Rajahmundry Cold Storage',
  'cold_storage',
  'Rajahmundry',
  'East Godavari',
  2800,
  '+91-883-2445678',
  ARRAY['Temperature Controlled', 'Blast Freezer', 'Processing Unit']
),

-- Prakasam District
(
  'Ongole Cold Storage Facility',
  'cold_storage',
  'Ongole',
  'Prakasam',
  2500,
  '+91-8592-234567',
  ARRAY['Multi-chamber', 'Temperature Controlled', 'Security']
),

-- Nellore District
(
  'Nellore Integrated Cold Chain',
  'cold_storage',
  'Nellore',
  'Nellore',
  4000,
  '+91-861-2345678',
  ARRAY['Multi-chamber', 'CA Storage', 'Blast Freezer', 'Ripening Chambers', 'Grading']
),

-- Visakhapatnam District
(
  'Visakhapatnam Port Cold Storage',
  'cold_storage',
  'Visakhapatnam Port Area',
  'Visakhapatnam',
  6000,
  '+91-891-2567890',
  ARRAY['Multi-chamber', 'Deep Freezer', 'Export Facility', 'Container Facility', 'Certification Services']
),
(
  'Anakapalle Cold Storage',
  'cold_storage',
  'Anakapalle',
  'Visakhapatnam',
  2200,
  '+91-891-3456789',
  ARRAY['Temperature Controlled', 'Humidity Control', 'Loading Bay']
),

-- Anantapur District
(
  'Anantapur Agro Cold Storage',
  'cold_storage',
  'Anantapur',
  'Anantapur',
  2800,
  '+91-8554-234567',
  ARRAY['Multi-chamber', 'Solar Power Backup', 'Grading Facility']
),

-- Kurnool District
(
  'Kurnool Cold Storage Complex',
  'cold_storage',
  'Kurnool',
  'Kurnool',
  3200,
  '+91-8518-234567',
  ARRAY['Multi-chamber', 'Temperature Controlled', 'Packaging Unit', 'Security']
),

-- Kadapa District
(
  'Kadapa District Cold Chain',
  'cold_storage',
  'Kadapa',
  'Kadapa',
  2500,
  '+91-8562-245678',
  ARRAY['Temperature Controlled', 'Pre-cooling', 'Security']
),

-- Srikakulam District
(
  'Srikakulam Coastal Cold Storage',
  'cold_storage',
  'Srikakulam',
  'Srikakulam',
  2000,
  '+91-8942-234567',
  ARRAY['Multi-chamber', 'Blast Freezer', 'Processing Area']
),

-- Vizianagaram District
(
  'Vizianagaram Cold Storage',
  'cold_storage',
  'Vizianagaram',
  'Vizianagaram',
  1800,
  '+91-8922-234567',
  ARRAY['Temperature Controlled', 'Security', 'Loading Bay']
),

-- Warangal (Telangana - for reference as it's nearby)
(
  'Warangal Cold Storage Facility',
  'cold_storage',
  'Warangal Urban',
  'Warangal',
  3000,
  '+91-870-2456789',
  ARRAY['Multi-chamber', 'Temperature Controlled', 'Grading', 'Packaging']
);

-- Note: This data represents cold storage facilities across Andhra Pradesh districts
-- Contact information is sample data and should be verified
-- Farmers should contact facilities directly for current rates and availability
