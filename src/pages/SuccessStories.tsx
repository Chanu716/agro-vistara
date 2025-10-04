import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Award, TrendingUp, MapPin, Sprout, Users, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SuccessStory {
  id: string;
  farmer_name: string;
  village: string;
  district: string;
  state: string;
  age?: number;
  photo_url?: string;
  story_title: string;
  story_content: string;
  crops_grown: string[];
  land_size_acres?: number;
  previous_yield_kg?: number;
  current_yield_kg?: number;
  yield_improvement_percentage?: number;
  income_before?: number;
  income_after?: number;
  techniques_used: string[];
  challenges_faced?: string;
  solutions_implemented?: string;
  advice_to_farmers?: string;
  testimonial?: string;
  is_featured: boolean;
  published_date: string;
}

const SuccessStories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    fetchStories();
  }, [selectedDistrict]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchStories = async () => {
    try {
      let query = supabase
        .from('success_stories')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('published_date', { ascending: false });

      if (selectedDistrict !== "all") {
        query = query.eq('district', selectedDistrict);
      }

      const { data, error } = await query;

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      toast.error(t('stories.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(t("common.signedOut"));
    navigate("/");
  };

  const getUniqueDistricts = () => {
    const districts = stories.map(story => story.district);
    return Array.from(new Set(districts)).sort();
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Award className="w-8 h-8 text-primary" />
            {t('stories.title')}
          </h1>
          <p className="text-muted-foreground">{t('stories.subtitle')}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                {t('stories.totalFarmers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                {t('stories.avgImprovement')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stories.length > 0
                  ? Math.round(
                      stories.reduce((sum, s) => sum + (s.yield_improvement_percentage || 0), 0) / stories.length
                    )
                  : 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                {t('stories.districts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUniqueDistricts().length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-3">
          <label className="text-sm font-medium">{t('stories.filterByDistrict')}:</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">{t('stories.allDistricts')}</option>
            {getUniqueDistricts().map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Success Stories Grid */}
        {stories.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('stories.noStories')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stories.map((story) => (
              <Card
                key={story.id}
                className={`hover:shadow-lg transition-shadow ${
                  story.is_featured ? 'border-primary border-2' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-1">
                        {story.is_featured && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        )}
                        {story.story_title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        {story.farmer_name} • {story.village}, {story.district}
                        {story.age && ` • ${story.age} ${t('stories.years')}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Story Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.story_content}
                  </p>

                  {/* Crops Grown */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{t('stories.cropsGrown')}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {story.crops_grown.map((crop, idx) => (
                        <Badge key={idx} variant="secondary">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Techniques Used */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{t('stories.techniquesUsed')}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {story.techniques_used.map((technique, idx) => (
                        <Badge key={idx} variant="outline">
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact Stats */}
                  {(story.yield_improvement_percentage || story.income_before) && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                      {story.yield_improvement_percentage && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {t('stories.yieldImprovement')}
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            +{story.yield_improvement_percentage}%
                          </p>
                        </div>
                      )}
                      {story.income_before && story.income_after && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {t('stories.incomeIncrease')}
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            ₹{(story.income_after - story.income_before).toLocaleString('en-IN')}
                          </p>
                        </div>
                      )}
                      {story.land_size_acres && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{t('stories.landSize')}</p>
                          <p className="text-lg font-semibold">
                            {story.land_size_acres} {t('stories.acres')}
                          </p>
                        </div>
                      )}
                      {story.current_yield_kg && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {t('stories.currentYield')}
                          </p>
                          <p className="text-lg font-semibold">{story.current_yield_kg} kg</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Testimonial */}
                  {story.testimonial && (
                    <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
                      <p className="text-sm italic text-foreground">"{story.testimonial}"</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        - {story.farmer_name}
                      </p>
                    </div>
                  )}

                  {/* Advice */}
                  {story.advice_to_farmers && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                        {t('stories.adviceToFarmers')}:
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {story.advice_to_farmers}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
