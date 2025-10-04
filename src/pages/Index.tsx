import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sprout, TrendingUp, Warehouse, Calendar, Users, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import heroImage from "@/assets/hero-farming.jpg";
import cropsImage from "@/assets/crops-illustration.jpg";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/dashboard");
      }
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const features = [
    {
      icon: Sprout,
      title: t('home.features.cropManagement.title'),
      description: t('home.features.cropManagement.description')
    },
    {
      icon: TrendingUp,
      title: t('home.features.yieldImprovement.title'),
      description: t('home.features.yieldImprovement.description')
    },
    {
      icon: Warehouse,
      title: t('home.features.storageLocator.title'),
      description: t('home.features.storageLocator.description')
    },
    {
      icon: Calendar,
      title: t('home.features.seasonalCalendar.title'),
      description: t('home.features.seasonalCalendar.description')
    },
    {
      icon: BarChart3,
      title: t('home.features.expenseTracking.title'),
      description: t('home.features.expenseTracking.description')
    },
    {
      icon: Users,
      title: t('home.features.communityKnowledge.title'),
      description: t('home.features.communityKnowledge.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        
        {/* Language Selector - Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSelector />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
            >
              {t('home.hero.getStarted')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
            >
              {t('home.hero.signIn')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-primary/20 hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                {t('home.benefits.title')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-lg text-muted-foreground">
                    {t('home.benefits.point1')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-lg text-muted-foreground">
                    {t('home.benefits.point2')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-lg text-muted-foreground">
                    {t('home.benefits.point3')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-lg text-muted-foreground">
                    {t('home.benefits.point4')}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={cropsImage} 
                alt="Various crops" 
                className="rounded-lg shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-6"
          >
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            {t('home.footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
