import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  visibility: number;
  pressure: number;
  description: string;
  icon: string;
  location: string;
}

interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

const WeatherWidget = ({ location = "Warangal,IN" }: { location?: string }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  // OpenWeatherMap API key
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "demo_key";

  useEffect(() => {
    fetchWeather();
  }, [location, useCurrentLocation]);

  const getUserLocation = () => {
    setGeoLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUseCurrentLocation(true);
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          setGeoLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(t("weather.locationError"));
          setGeoLoading(false);
        }
      );
    } else {
      setError(t("weather.locationError"));
      setGeoLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather by coordinates
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!currentResponse.ok) {
        throw new Error("Weather service unavailable");
      }

      const currentData = await currentResponse.json();

      setWeather({
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        visibility: currentData.visibility / 1000,
        pressure: currentData.main.pressure,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        location: currentData.name,
      });

      // Fetch 5-day forecast by coordinates
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        processForecastData(forecastData);
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (useCurrentLocation) return; // Skip if using geolocation
    
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      if (!currentResponse.ok) {
        throw new Error("Weather service unavailable");
      }

      const currentData = await currentResponse.json();

      setWeather({
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        visibility: currentData.visibility / 1000,
        pressure: currentData.main.pressure,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        location: currentData.name,
      });

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        processForecastData(forecastData);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Unable to fetch weather data. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (forecastData: any) => {
    // Group by day and get daily data
    const dailyData: Record<string, any> = {};
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          descriptions: [],
          icons: [],
        };
      }
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].descriptions.push(item.weather[0].description);
      dailyData[date].icons.push(item.weather[0].icon);
    });

    const forecastDays: ForecastDay[] = Object.entries(dailyData)
      .slice(0, 5)
      .map(([date, data]: [string, any]) => ({
        date,
        temp_max: Math.round(Math.max(...data.temps)),
        temp_min: Math.round(Math.min(...data.temps)),
        description: data.descriptions[0],
        icon: data.icons[0],
      }));

    setForecast(forecastDays);
  };

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud className="w-8 h-8 text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t("weather.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">{t("common.loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t("weather.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            {t("weather.title")} - {weather?.location}
          </CardTitle>
          <Button 
            onClick={getUserLocation} 
            disabled={geoLoading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {geoLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            {t("weather.useMyLocation")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-4">
            {weather && getWeatherIcon(weather.icon)}
            <div>
              <div className="text-4xl font-bold">{weather?.temp}°C</div>
              <p className="text-muted-foreground capitalize">{weather?.description}</p>
              <p className="text-sm text-muted-foreground">
                {t("weather.feelsLike")}: {weather?.feels_like}°C
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t("weather.humidity")}</p>
                <p className="font-semibold">{weather?.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t("weather.windSpeed")}</p>
                <p className="font-semibold">{weather?.wind_speed} m/s</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t("weather.visibility")}</p>
                <p className="font-semibold">{weather?.visibility} km</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t("weather.pressure")}</p>
                <p className="font-semibold">{weather?.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">{t("weather.forecast")}</h4>
            <div className="grid grid-cols-5 gap-3">
              {forecast.map((day, idx) => (
                <div key={idx} className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{day.temp_max}°</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-muted-foreground">{day.temp_min}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
