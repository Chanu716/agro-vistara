import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin, Droplets, Mountain } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const Farms = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [farms, setFarms] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    total_area_acres: "",
    soil_type: "",
    water_source: ""
  });

  useEffect(() => {
    checkAuth();
    fetchFarms();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchFarms = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('farms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(t("farms.fetchFailed"));
    } else {
      setFarms(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('farms')
      .insert([{
        ...formData,
        user_id: user.id,
        total_area_acres: parseFloat(formData.total_area_acres)
      }]);

    if (error) {
      toast.error(t("farms.farmAddFailed"));
    } else {
      toast.success(t("farms.farmAdded"));
      setIsDialogOpen(false);
      setFormData({
        name: "",
        location: "",
        total_area_acres: "",
        soil_type: "",
        water_source: ""
      });
      fetchFarms();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("farms.title")}</h1>
            <p className="text-muted-foreground">{t("farms.subtitle")}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("farms.addFarm")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t("farms.addNewFarm")}</DialogTitle>
                <DialogDescription>
                  {t("farms.registerNewFarm")}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("farms.farmNameRequired")}</Label>
                  <Input
                    id="name"
                    placeholder={t("farms.farmNamePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t("farms.locationRequired")}</Label>
                  <Input
                    id="location"
                    placeholder={t("farms.locationPlaceholder")}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">{t("farms.totalArea")}</Label>
                  <Input
                    id="area"
                    type="number"
                    step="0.01"
                    placeholder={t("farms.areaPlaceholder")}
                    value={formData.total_area_acres}
                    onChange={(e) => setFormData({ ...formData, total_area_acres: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil">{t("farms.soilType")}</Label>
                  <Select value={formData.soil_type} onValueChange={(value) => setFormData({ ...formData, soil_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("farms.selectSoilType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Black">{t("farms.soilBlack")}</SelectItem>
                      <SelectItem value="Red">{t("farms.soilRed")}</SelectItem>
                      <SelectItem value="Loamy">{t("farms.soilLoamy")}</SelectItem>
                      <SelectItem value="Clay">{t("farms.soilClay")}</SelectItem>
                      <SelectItem value="Sandy Loam">{t("farms.soilSandyLoam")}</SelectItem>
                      <SelectItem value="Clay Loam">{t("farms.soilClayLoam")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water">{t("farms.waterSource")}</Label>
                  <Select value={formData.water_source} onValueChange={(value) => setFormData({ ...formData, water_source: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("farms.selectWaterSource")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rain-fed">{t("farms.waterRainFed")}</SelectItem>
                      <SelectItem value="Borewell">{t("farms.waterBorewell")}</SelectItem>
                      <SelectItem value="Canal">{t("farms.waterCanal")}</SelectItem>
                      <SelectItem value="River">{t("farms.waterRiver")}</SelectItem>
                      <SelectItem value="Pond">{t("farms.waterPond")}</SelectItem>
                      <SelectItem value="Mixed">{t("farms.waterMixed")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    {t("farms.cancel")}
                  </Button>
                  <Button type="submit" className="flex-1">{t("farms.addFarm")}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {farms.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>{t("farms.noFarmsYet")}</CardTitle>
              <CardDescription>
                {t("farms.addFirstFarm")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                {t("farms.addFirstFarmButton")}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map((farm) => (
              <Card key={farm.id} className="hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-primary" />
                    {farm.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {farm.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("farms.totalAreaLabel")}</span>
                    <span className="font-semibold">{farm.total_area_acres} {t("farms.acres")}</span>
                  </div>
                  {farm.soil_type && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t("farms.soilType")}</span>
                      <span className="font-semibold">{farm.soil_type}</span>
                    </div>
                  )}
                  {farm.water_source && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Droplets className="w-4 h-4" />
                        {t("farms.waterSource")}
                      </span>
                      <span className="font-semibold">{farm.water_source}</span>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate(`/crops/${farm.id}`)}
                  >
                    {t("farms.viewCrops")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farms;
