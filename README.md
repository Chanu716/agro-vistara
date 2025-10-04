# 🌾 Agro-Vistara

**Integrated Crop Management System for Tribal Farmers**

Empowering tribal farming communities with modern tools and traditional wisdom for sustainable agriculture. A comprehensive farming management platform with multilingual support (English & Telugu) designed specifically for tribal farmers in India.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.58.0-green.svg)](https://supabase.com/)

## 🚀 Features

### Core Features

#### 1. 📊 Dashboard
- Real-time farm overview with statistics
- Total farms, active crops, expenses tracking
- Expected yield calculations
- Quick access to all major features

#### 2. 🌤️ Weather Integration
- Real-time weather data from OpenWeatherMap API
- 5-day weather forecast
- Location-based weather using user's district
- Temperature, humidity, and weather conditions

#### 3. 🏡 Farm Management
- Add and manage multiple farms
- Track farm details (location, area, soil type, water source)
- Monitor crop records per farm
- Calculate total farming area

#### 4. 🌱 Crop Advisory with AI Personalization
- **Soil-type compatibility scoring** (0-100%)
- Smart crop recommendations based on farm's soil type
- Seasonal filtering (Kharif/Rabi/Summer)
- Inter-cropping and crop rotation suggestions
- Compatibility badges: Excellent/Good/Moderate/Fair
- Filter by compatibility level
- Planting tips and care instructions
- Average yield and market price information

#### 5. 📅 Seasonal Crop Calendar
- Interactive monthly calendar
- Season-based crop recommendations (Kharif/Rabi/Summer)
- Best planting times for each crop
- Suitable soil types and planting tips
- Navigate through 12 months with season filters

#### 6. 💰 Profitability Calculator
- Automatic profit calculation: (Yield × Price) - Expenses
- Per-crop profitability analysis
- Per-acre profit metrics
- Detailed expense breakdown
- Revenue vs Expenses comparison
- Visual profit/loss indicators

#### 7. 🏆 Success Stories
- Real farmer success case studies
- District-wise filtering
- Before/After income comparisons
- Yield improvement metrics
- Techniques used by successful farmers
- Advice from experienced farmers
- Visual testimonials with farmer photos

#### 8. 📚 Farming Guides
- Step-by-step pictorial guides
- Categories: Planting, Maintenance, Harvesting, Soil Preparation
- Detailed instructions with images
- Tools required and estimated costs
- Expected outcomes and duration
- Common mistakes to avoid
- Expert tips from agricultural scientists

#### 9. 💵 Expense Tracking
- Track all farming expenses by category
- Link expenses to specific crop records
- Categories: Seeds, Fertilizer, Pesticide, Labor, Equipment, Irrigation, Other
- Monthly expense summaries
- Expense history with filtering

#### 10. 🏪 Storage Facility Locator
- Find nearby godowns and cold storage
- District-wise facility search
- Capacity and contact information
- Storage facilities with GPS coordinates

#### 11. 🎤 Voice Assistant (Telugu & English)
- Voice commands in Telugu and English
- Text-to-Speech (TTS) feedback
- Navigate to any page using voice
- Live transcript display
- Web Speech API integration
- Microphone and speaker controls

#### 12. 📴 Offline Capability (PWA)
- Service Worker with Workbox
- Offline-first architecture
- IndexedDB for local data storage
- Automatic data caching when online
- Background sync for pending actions
- Offline indicator with sync status
- Works without internet connection

### 🌍 Internationalization
- **English** - Full support
- **తెలుగు (Telugu)** - Complete translations
- 20+ other languages supported
- Easy language switching
- Voice support in both languages

### 🎨 UI/UX Features
- Modern, clean interface with shadcn-ui components
- Fully responsive design (mobile, tablet, desktop)
- Dark mode ready
- Smooth animations and transitions
- Loading states and error handling
- Accessible (ARIA labels, keyboard navigation)
- Consistent color scheme and branding

## 🛠️ Tech Stack

**Frontend:**
- [React 18.3.1](https://reactjs.org/) - UI library
- [TypeScript 5.6.2](https://www.typescriptlang.org/) - Type safety
- [Vite 7.1.9](https://vitejs.dev/) - Build tool
- [Tailwind CSS 3.4.17](https://tailwindcss.com/) - Styling
- [shadcn-ui](https://ui.shadcn.com/) - Component library
- [Lucide React](https://lucide.dev/) - Icons
- [React Router 6.30.1](https://reactrouter.com/) - Routing
- [TanStack Query](https://tanstack.com/query/) - Data fetching

**Backend & Database:**
- [Supabase 2.58.0](https://supabase.com/) - Backend-as-a-Service
- PostgreSQL - Database
- Row Level Security (RLS) - Data security
- Supabase Auth - User authentication

**State Management & Utilities:**
- [react-i18next 16.0.0](https://react.i18next.com/) - Internationalization
- [date-fns](https://date-fns.org/) - Date utilities
- [Recharts](https://recharts.org/) - Data visualization

**Offline & PWA:**
- [Workbox](https://developers.google.com/web/tools/workbox) - Service Worker
- [idb](https://www.npmjs.com/package/idb) - IndexedDB wrapper
- Service Worker API - Caching and offline support
- Background Sync API - Sync pending actions

**External APIs:**
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - Voice recognition & synthesis

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account
- OpenWeatherMap API key

### Setup

```bash
# Clone the repository
git clone https://github.com/Chanu716/agro-vistara.git

# Navigate to project directory
cd agro-vistara

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables to .env:
# VITE_SUPABASE_PROJECT_ID=your_project_id
# VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_OPENWEATHER_API_KEY=your_openweather_key

# Run database migrations (in Supabase dashboard)
# Execute SQL files in supabase/migrations/ folder

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🗄️ Database Schema

The application uses 8 main tables:

1. **profiles** - User profiles with personal information
2. **farms** - Farm details (location, area, soil type)
3. **crop_records** - Individual crop planting and harvest records
4. **expenses** - Farming expense tracking
5. **storage_facilities** - Godown and cold storage information
6. **crop_recommendations** - Expert crop advisory data
7. **success_stories** - Farmer success case studies
8. **farming_guides** - Step-by-step farming instructions

All tables include Row Level Security (RLS) policies for data protection.

## 🚀 Deployment

### Netlify Deployment

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Environment Variables:**
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_OPENWEATHER_API_KEY`

### Alternative Deployment Options
- Vercel
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## 📱 Progressive Web App (PWA)

Agro-Vistara is a full-fledged PWA with:
- ✅ Installable on mobile and desktop
- ✅ Offline functionality
- ✅ Background sync
- ✅ Push notifications ready
- ✅ App-like experience

To install:
1. Open the app in a browser
2. Click "Add to Home Screen" prompt
3. Use like a native app

## 🎯 Usage

1. **Sign Up/Login** - Create account or login with existing credentials
2. **Add Farms** - Register your farm details (location, soil type, area)
3. **Add Crops** - Track crops you're planting with expected harvest dates
4. **Check Weather** - View real-time weather for your location
5. **Get Advisory** - See personalized crop recommendations based on your soil type
6. **Track Expenses** - Record all farming costs
7. **Calculate Profit** - Automatic profitability analysis
8. **Learn from Success Stories** - Read how other farmers succeeded
9. **Follow Guides** - Step-by-step farming instructions
10. **Use Voice Commands** - Navigate using Telugu or English voice
11. **Work Offline** - Access data even without internet

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Chanu716** - *Initial work* - [GitHub](https://github.com/Chanu716)

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Supabase for backend infrastructure
- shadcn-ui for beautiful UI components
- All the tribal farmers who inspired this project

## 📞 Support

For support, email support@agrovistara.com or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Soil testing integration
- [ ] Market price predictions with ML
- [ ] Community forum
- [ ] WhatsApp notifications
- [ ] Crop disease detection with AI
- [ ] Government scheme integration
- [ ] Multi-language expansion (Hindi, Tamil, Kannada)

---

**Made with ❤️ for tribal farmers of India** 🇮🇳
