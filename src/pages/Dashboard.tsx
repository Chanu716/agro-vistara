import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Warehouse, TrendingUp, IndianRupee, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import WeatherWidget from "@/components/WeatherWidget";
import ProfitabilityCalculator from "@/components/ProfitabilityCalculator";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalFarms: 0,
    activeCrops: 0,
    totalExpenses: 0,
    expectedYield: 0
  });

  useEffect(() => {
    checkAuth();
    fetchProfile();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
    }
  };

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
  };

  const fetchStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch farms count
    const { count: farmsCount } = await supabase
      .from('farms')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Fetch active crops count
    const { count: cropsCount } = await supabase
      .from('crop_records')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['planned', 'growing']);

    // Fetch total expenses
    const { data: expensesData } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', user.id);
    
    const totalExpenses = expensesData?.reduce((sum: number, exp: { amount: number }) => sum + Number(exp.amount), 0) || 0;

    // Fetch expected yield
    const { data: cropsData } = await supabase
      .from('crop_records')
      .select('expected_yield_kg')
      .eq('user_id', user.id)
      .in('status', ['planned', 'growing']);
    
    const expectedYield = cropsData?.reduce((sum: number, crop: { expected_yield_kg: number | null }) => sum + Number(crop.expected_yield_kg || 0), 0) || 0;

    setStats({
      totalFarms: farmsCount || 0,
      activeCrops: cropsCount || 0,
      totalExpenses,
      expectedYield
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(t("common.signedOut"));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.welcomeBack")}, {profile?.full_name || t("dashboard.welcomeDefault")}!
          </h1>
          <p className="text-muted-foreground">
            {profile?.village && profile?.district 
              ? `${profile.village}, ${profile.district}` 
              : t("dashboard.manageText")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.totalFarms")}</CardTitle>
              <Sprout className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFarms}</div>
              <p className="text-xs text-muted-foreground">{t("dashboard.registeredFarms")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.activeCrops")}</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCrops}</div>
              <p className="text-xs text-muted-foreground">{t("dashboard.growingOrPlanned")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.totalExpenses")}</CardTitle>
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{t("dashboard.allTimeSpending")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.expectedYield")}</CardTitle>
              <Warehouse className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.expectedYield.toLocaleString()} kg</div>
              <p className="text-xs text-muted-foreground">{t("dashboard.fromActiveCrops")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Weather Widget */}
        <div className="mb-8">
          <WeatherWidget location={profile?.district ? `${profile.district},IN` : "Warangal,IN"} />
        </div>

        {/* Profitability Calculator */}
        <div className="mb-8">
          <ProfitabilityCalculator />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate('/farms')}>
            <CardHeader>
              <CardTitle>{t("dashboard.myFarms")}</CardTitle>
              <CardDescription>{t("dashboard.manageFarmProperties")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                {t("dashboard.viewFarms")}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate('/advisory')}>
            <CardHeader>
              <CardTitle>{t("dashboard.cropAdvisory")}</CardTitle>
              <CardDescription>{t("dashboard.getRecommendations")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("dashboard.viewRecommendations")}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate('/expenses')}>
            <CardHeader>
              <CardTitle>{t("dashboard.trackExpenses")}</CardTitle>
              <CardDescription>{t("dashboard.monitorCosts")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("dashboard.viewExpenses")}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => navigate('/storage')}>
            <CardHeader>
              <CardTitle>{t("dashboard.storageFacilities")}</CardTitle>
              <CardDescription>{t("dashboard.findNearby")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("dashboard.findStorage")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
