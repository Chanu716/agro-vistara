import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, CloudRain, Sun, Snowflake, Sprout } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const SeasonalCalendar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    checkAuth();
    fetchCrops();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchCrops = async () => {
    const { data, error } = await supabase
      .from('crop_recommendations')
      .select('*')
      .order('crop_name');

    if (!error && data) {
      setCrops(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const months = [
    { name: "January", season: "rabi", index: 0 },
    { name: "February", season: "rabi", index: 1 },
    { name: "March", season: "summer", index: 2 },
    { name: "April", season: "summer", index: 3 },
    { name: "May", season: "summer", index: 4 },
    { name: "June", season: "kharif", index: 5 },
    { name: "July", season: "kharif", index: 6 },
    { name: "August", season: "kharif", index: 7 },
    { name: "September", season: "kharif", index: 8 },
    { name: "October", season: "rabi", index: 9 },
    { name: "November", season: "rabi", index: 10 },
    { name: "December", season: "rabi", index: 11 },
  ];

  const getSeasonIcon = (season: string) => {
    switch(season) {
      case 'kharif': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'rabi': return <Snowflake className="w-5 h-5 text-cyan-500" />;
      case 'summer': return <Sun className="w-5 h-5 text-yellow-500" />;
      default: return <Sprout className="w-5 h-5 text-green-500" />;
    }
  };

  const getSeasonColor = (season: string) => {
    switch(season) {
      case 'kharif': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rabi': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'summer': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getCropsForSeason = (season: string) => {
    return crops.filter(crop => crop.best_season === season);
  };

  const getCropsForMonth = (month: number) => {
    const monthData = months[month];
    return getCropsForSeason(monthData.season);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <CalendarIcon className="w-8 h-8" />
            {t("calendar.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("calendar.subtitle")}
          </p>
        </div>

        {/* Season Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="w-6 h-6 text-blue-500" />
                {t("calendar.kharif")}
              </CardTitle>
              <CardDescription>{t("calendar.kharifDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {getCropsForSeason('kharif').map((crop) => (
                  <Badge key={crop.id} variant="outline" className="text-blue-700">
                    {crop.crop_name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Snowflake className="w-6 h-6 text-cyan-500" />
                {t("calendar.rabi")}
              </CardTitle>
              <CardDescription>{t("calendar.rabiDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {getCropsForSeason('rabi').map((crop) => (
                  <Badge key={crop.id} variant="outline" className="text-cyan-700">
                    {crop.crop_name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-yellow-500" />
                {t("calendar.summer")}
              </CardTitle>
              <CardDescription>{t("calendar.summerDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {getCropsForSeason('summer').map((crop) => (
                  <Badge key={crop.id} variant="outline" className="text-yellow-700">
                    {crop.crop_name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.monthlyView")}</CardTitle>
            <CardDescription>{t("calendar.selectMonth")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
              <TabsList className="grid grid-cols-6 lg:grid-cols-12 mb-6">
                {months.map((month) => (
                  <TabsTrigger 
                    key={month.index} 
                    value={month.index.toString()}
                    className="text-xs"
                  >
                    {month.name.slice(0, 3)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {months.map((month) => (
                <TabsContent key={month.index} value={month.index.toString()}>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${getSeasonColor(month.season)}`}>
                      <div className="flex items-center gap-3 mb-2">
                        {getSeasonIcon(month.season)}
                        <div>
                          <h3 className="text-lg font-semibold">{month.name}</h3>
                          <p className="text-sm">
                            {month.season === 'kharif' && t("calendar.kharif")}
                            {month.season === 'rabi' && t("calendar.rabi")}
                            {month.season === 'summer' && t("calendar.summer")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {getCropsForMonth(month.index).map((crop) => (
                        <Card key={crop.id}>
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Sprout className="w-4 h-4 text-primary" />
                              {crop.crop_name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {crop.planting_tips && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  {t("calendar.plantingTime")}
                                </p>
                                <p className="text-sm">{crop.planting_tips}</p>
                              </div>
                            )}
                            {crop.suitable_soils && crop.suitable_soils.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  {t("calendar.suitableSoils")}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {crop.suitable_soils.map((soil: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {soil}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeasonalCalendar;
