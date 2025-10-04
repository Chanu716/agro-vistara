import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Clock, TrendingUp, AlertCircle, Lightbulb, CheckCircle, Sprout } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface GuideStep {
  step_number: number;
  title: string;
  description: string;
  duration_minutes?: number;
  tips?: string[];
}

interface FarmingGuide {
  id: string;
  guide_title: string;
  guide_description: string;
  crop_name: string;
  category: string;
  difficulty_level: string;
  duration_days?: number;
  best_season?: string;
  steps: GuideStep[];
  tools_required: string[];
  estimated_cost?: number;
  expected_outcome?: string;
  common_mistakes: string[];
  expert_tips: string[];
  is_featured: boolean;
}

const FarmingGuides = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [guides, setGuides] = useState<FarmingGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGuide, setSelectedGuide] = useState<FarmingGuide | null>(null);

  useEffect(() => {
    checkAuth();
    fetchGuides();
  }, [selectedCategory]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchGuides = async () => {
    try {
      let query = supabase
        .from('farming_guides')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching farming guides:', error);
      toast.error(t('guides.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(t("common.signedOut"));
    navigate("/");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      preparation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      planting: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      maintenance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      harvesting: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      complete: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-green-500",
      intermediate: "bg-yellow-500",
      advanced: "bg-red-500",
    };
    return colors[level] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onSignOut={handleSignOut} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Guide Detail View
  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onSignOut={handleSignOut} />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedGuide(null)}
            className="mb-6"
          >
            ← {t('guides.backToGuides')}
          </Button>

          {/* Guide Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{selectedGuide.guide_title}</CardTitle>
                  <CardDescription className="text-base">{selectedGuide.guide_description}</CardDescription>
                </div>
                {selectedGuide.is_featured && (
                  <Badge className="bg-yellow-500 text-white">
                    {t('guides.featured')}
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className={getCategoryColor(selectedGuide.category)}>
                  {t(`guides.category_${selectedGuide.category}`)}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Sprout className="w-3 h-3" />
                  {selectedGuide.crop_name}
                </Badge>
                {selectedGuide.duration_days && (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedGuide.duration_days} {t('guides.days')}
                  </Badge>
                )}
                {selectedGuide.best_season && (
                  <Badge variant="outline">
                    {t(`guides.season_${selectedGuide.best_season}`)}
                  </Badge>
                )}
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedGuide.difficulty_level)}`}>
                  <span className="text-white">{t(`guides.level_${selectedGuide.difficulty_level}`)}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tools & Cost */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('guides.toolsRequired')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedGuide.tools_required.map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{tool}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {selectedGuide.estimated_cost && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('guides.estimatedCost')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    ₹{selectedGuide.estimated_cost.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('guides.perAcre')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Step-by-Step Guide */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('guides.stepByStep')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedGuide.steps.map((step, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.step_number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  
                  {step.duration_minutes && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration_minutes} {t('guides.minutes')}</span>
                    </div>
                  )}
                  
                  {step.tips && step.tips.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          {t('guides.tips')}:
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {step.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="text-sm text-blue-800 dark:text-blue-200">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expected Outcome */}
          {selectedGuide.expected_outcome && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {t('guides.expectedOutcome')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedGuide.expected_outcome}</p>
              </CardContent>
            </Card>
          )}

          {/* Common Mistakes & Expert Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            {selectedGuide.common_mistakes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    {t('guides.commonMistakes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedGuide.common_mistakes.map((mistake, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                        <span>⚠️</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {selectedGuide.expert_tips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Lightbulb className="w-5 h-5" />
                    {t('guides.expertTips')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedGuide.expert_tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                        <span>💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Guides List View
  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            {t('guides.title')}
          </h1>
          <p className="text-muted-foreground">{t('guides.subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium">{t('guides.filterByCategory')}:</label>
          {['all', 'complete', 'preparation', 'planting', 'maintenance', 'harvesting'].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {t(`guides.category_${cat}`)}
            </Button>
          ))}
        </div>

        {/* Guides Grid */}
        {guides.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('guides.noGuides')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Card
                key={guide.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  guide.is_featured ? 'border-primary border-2' : ''
                }`}
                onClick={() => setSelectedGuide(guide)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(guide.category)}>
                      {t(`guides.category_${guide.category}`)}
                    </Badge>
                    {guide.is_featured && (
                      <Badge className="bg-yellow-500 text-white text-xs">
                        {t('guides.featured')}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{guide.guide_title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {guide.guide_description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Sprout className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{guide.crop_name}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {guide.duration_days && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{guide.duration_days} {t('guides.days')}</span>
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(guide.difficulty_level)}`}>
                      <span className="text-white">{t(`guides.level_${guide.difficulty_level}`)}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      {t('guides.viewGuide')} →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingGuides;
