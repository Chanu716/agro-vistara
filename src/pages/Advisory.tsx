import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, Sun, CloudRain, Snowflake, Award, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

type CropRecommendation = {
  id: string;
  crop_name: string;
  best_season: string;
  suitable_soils: string[] | null;
  companion_crops: string[] | null;
  rotation_crops: string[] | null;
  planting_tips: string | null;
  care_instructions: string | null;
  avg_yield_per_acre: number | null;
  market_price_range: string | null;
  compatibilityScore?: number;
};

const Advisory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [userFarms, setUserFarms] = useState<any[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [soilFilter, setSoilFilter] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    fetchUserFarms();
    fetchRecommendations();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchUserFarms = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    type Farm = {
      id: string;
      user_id: string;
      name: string;
      location: string;
      total_area_acres: number;
      soil_type: string | null;
      water_source: string | null;
      created_at: string;
      updated_at: string;
    };

    const { data, error } = await supabase
      .from('farms')
      .select('*')
      .eq('user_id', user.id) as { data: Farm[] | null; error: any };

    if (!error && data && data.length > 0) {
      setUserFarms(data);
      setSelectedFarm(data[0].id);
    }
  };

  const fetchRecommendations = async () => {
    const { data, error } = await supabase
      .from('crop_recommendations')
      .select('*')
      .order('crop_name');

    if (!error && data) {
      setRecommendations(data);
    }
  };

  // Calculate compatibility score based on soil type matching
  const calculateCompatibilityScore = (crop: CropRecommendation, farmSoilType: string | null): number => {
    if (!farmSoilType || !crop.suitable_soils || crop.suitable_soils.length === 0) {
      return 0; // No data available
    }

    // Normalize soil types for comparison
    const normalizedFarmSoil = farmSoilType.toLowerCase().trim();
    const normalizedSuitableSoils = crop.suitable_soils.map(s => s.toLowerCase().trim());

    // Direct match = 100%
    if (normalizedSuitableSoils.includes(normalizedFarmSoil)) {
      return 100;
    }

    // Partial match logic (e.g., "red soil" matches "red loamy soil")
    const farmSoilWords = normalizedFarmSoil.split(' ');
    let matchScore = 0;
    
    for (const suitableSoil of normalizedSuitableSoils) {
      const suitableWords = suitableSoil.split(' ');
      const matchingWords = farmSoilWords.filter(word => suitableWords.includes(word));
      const partialScore = (matchingWords.length / Math.max(farmSoilWords.length, suitableWords.length)) * 70;
      matchScore = Math.max(matchScore, partialScore);
    }

    return Math.round(matchScore);
  };

  // Get compatibility badge color
  const getCompatibilityBadge = (score: number) => {
    if (score >= 90) return { label: t("advisory.excellent"), variant: "default" as const, color: "bg-green-500" };
    if (score >= 70) return { label: t("advisory.good"), variant: "secondary" as const, color: "bg-blue-500" };
    if (score >= 50) return { label: t("advisory.moderate"), variant: "outline" as const, color: "bg-yellow-500" };
    if (score > 0) return { label: t("advisory.fair"), variant: "outline" as const, color: "bg-orange-500" };
    return { label: t("advisory.unknown"), variant: "outline" as const, color: "bg-gray-400" };
  };

  // Filter and sort recommendations with compatibility scoring
  const getEnhancedRecommendations = () => {
    if (!selectedFarm) return recommendations;

    const selectedFarmData = userFarms.find(f => f.id === selectedFarm);
    if (!selectedFarmData) return recommendations;

    // Calculate compatibility scores
    const withScores = recommendations.map(crop => ({
      ...crop,
      compatibilityScore: calculateCompatibilityScore(crop, selectedFarmData.soil_type)
    }));

    // Filter by soil type if selected
    let filtered = withScores;
    if (soilFilter !== "all") {
      filtered = withScores.filter(crop => {
        if (soilFilter === "compatible") {
          return crop.compatibilityScore >= 70;
        } else if (soilFilter === "incompatible") {
          return crop.compatibilityScore < 70 && crop.compatibilityScore > 0;
        }
        return true;
      });
    }

    // Sort by compatibility score (descending)
    return filtered.sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getSeasonIcon = (season: string) => {
    switch(season) {
      case 'kharif': return <CloudRain className="w-5 h-5" />;
      case 'rabi': return <Snowflake className="w-5 h-5" />;
      case 'summer': return <Sun className="w-5 h-5" />;
      default: return <Sprout className="w-5 h-5" />;
    }
  };

  const getSeasonLabel = (season: string) => {
    switch(season) {
      case 'kharif': return t("advisory.kharifLabel");
      case 'rabi': return t("advisory.rabiLabel");
      case 'summer': return t("advisory.summerLabel");
      default: return season;
    }
  };

  const filterBySeason = (season: string) => {
    const enhanced = getEnhancedRecommendations();
    return enhanced.filter(rec => rec.best_season === season);
  };

  const CropCard = ({ crop }: { crop: CropRecommendation }) => {
    const compatibilityBadge = crop.compatibilityScore !== undefined 
      ? getCompatibilityBadge(crop.compatibilityScore)
      : null;

    return (
      <Card className="hover:shadow-elevated transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              {crop.crop_name}
            </CardTitle>
            {compatibilityBadge && crop.compatibilityScore! > 0 && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <Badge variant={compatibilityBadge.variant} className="gap-1">
                  <div className={`w-2 h-2 rounded-full ${compatibilityBadge.color}`}></div>
                  {crop.compatibilityScore}%
                </Badge>
              </div>
            )}
          </div>
          <CardDescription className="flex items-center gap-2">
            {getSeasonIcon(crop.best_season)}
            {getSeasonLabel(crop.best_season)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {compatibilityBadge && crop.compatibilityScore! > 0 && (
            <Alert className="bg-muted/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <span className="font-semibold">{compatibilityBadge.label}</span> {t("advisory.compatibility")} - {t("advisory.compatibilityDesc")}
              </AlertDescription>
            </Alert>
          )}

          {crop.suitable_soils && crop.suitable_soils.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">{t("advisory.suitableSoils")}</h4>
              <div className="flex flex-wrap gap-2">
                {crop.suitable_soils.map((soil: string, idx: number) => (
                  <Badge key={idx} variant="secondary">{soil}</Badge>
                ))}
              </div>
            </div>
          )}

          {crop.companion_crops && crop.companion_crops.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">{t("advisory.interCroppingPartners")}</h4>
              <div className="flex flex-wrap gap-2">
                {crop.companion_crops.map((partner: string, idx: number) => (
                  <Badge key={idx} variant="outline">{partner}</Badge>
                ))}
              </div>
            </div>
          )}

          {crop.rotation_crops && crop.rotation_crops.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">{t("advisory.rotationCrops")}</h4>
              <div className="flex flex-wrap gap-2">
                {crop.rotation_crops.map((rotation: string, idx: number) => (
                  <Badge key={idx} variant="outline">{rotation}</Badge>
                ))}
              </div>
            </div>
          )}

          {crop.planting_tips && (
            <div>
              <h4 className="text-sm font-semibold mb-2">{t("advisory.plantingTips")}</h4>
              <p className="text-sm text-muted-foreground">{crop.planting_tips}</p>
            </div>
          )}

          {crop.care_instructions && (
            <div>
              <h4 className="text-sm font-semibold mb-2">{t("advisory.careInstructions")}</h4>
              <p className="text-sm text-muted-foreground">{crop.care_instructions}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            {crop.avg_yield_per_acre && (
              <div>
                <p className="text-xs text-muted-foreground">{t("advisory.avgYield")}</p>
                <p className="font-semibold">{crop.avg_yield_per_acre} {t("advisory.kg")}</p>
              </div>
            )}
            {crop.market_price_range && (
              <div>
                <p className="text-xs text-muted-foreground">{t("advisory.marketPrice")}</p>
                <p className="font-semibold">{crop.market_price_range}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("advisory.title")}</h1>
          <p className="text-muted-foreground">
            {t("advisory.subtitle")}
          </p>
        </div>

        {/* Farm and Soil Type Filters */}
        {userFarms.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("advisory.selectFarm")}</label>
              <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userFarms.map((farm) => (
                    <SelectItem key={farm.id} value={farm.id}>
                      {farm.name} ({farm.soil_type || t("advisory.noSoilType")})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("advisory.filterCompatibility")}</label>
              <Select value={soilFilter} onValueChange={setSoilFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("advisory.allCrops")}</SelectItem>
                  <SelectItem value="compatible">{t("advisory.highlyCompatible")}</SelectItem>
                  <SelectItem value="incompatible">{t("advisory.lessCompatible")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">{t("advisory.allCrops")}</TabsTrigger>
            <TabsTrigger value="kharif" className="gap-2">
              <CloudRain className="w-4 h-4" />
              {t("advisory.kharif")}
            </TabsTrigger>
            <TabsTrigger value="rabi" className="gap-2">
              <Snowflake className="w-4 h-4" />
              {t("advisory.rabi")}
            </TabsTrigger>
            <TabsTrigger value="summer" className="gap-2">
              <Sun className="w-4 h-4" />
              {t("advisory.summer")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {getEnhancedRecommendations().map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kharif" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filterBySeason('kharif').map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rabi" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filterBySeason('rabi').map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summer" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filterBySeason('summer').map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Advisory;
