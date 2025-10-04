import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Sun, CloudRain, Snowflake } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const Advisory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchRecommendations();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
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
    return recommendations.filter(rec => rec.best_season === season);
  };

  const CropCard = ({ crop }: { crop: any }) => (
    <Card className="hover:shadow-elevated transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" />
          {crop.crop_name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {getSeasonIcon(crop.best_season)}
          {getSeasonLabel(crop.best_season)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              {recommendations.map((crop) => (
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
