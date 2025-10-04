import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Warehouse, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const Storage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [facilities, setFacilities] = useState<any[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAuth();
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = facilities.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFacilities(filtered);
    } else {
      setFilteredFacilities(facilities);
    }
  }, [searchTerm, facilities]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchFacilities = async () => {
    const { data, error } = await supabase
      .from('storage_facilities')
      .select('*')
      .order('district');

    if (!error && data) {
      setFacilities(data);
      setFilteredFacilities(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'government_godown': return 'Government Godown';
      case 'private_warehouse': return 'Private Warehouse';
      case 'cold_storage': return 'Cold Storage';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'government_godown': return 'bg-primary text-primary-foreground';
      case 'private_warehouse': return 'bg-secondary text-secondary-foreground';
      case 'cold_storage': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("storage.title")}</h1>
          <p className="text-muted-foreground">
            {t("storage.subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("storage.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Storage Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <Card key={facility.id} className="hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-primary" />
                    {facility.name}
                  </CardTitle>
                  <Badge className={getTypeColor(facility.type)}>
                    {getTypeLabel(facility.type)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {facility.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">District</span>
                  <span className="font-semibold">{facility.district}</span>
                </div>

                {facility.capacity_tonnes && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Capacity</span>
                    <span className="font-semibold">{facility.capacity_tonnes} tonnes</span>
                  </div>
                )}

                {facility.contact_phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${facility.contact_phone}`} className="text-primary hover:underline">
                      {facility.contact_phone}
                    </a>
                  </div>
                )}

                {facility.facilities && facility.facilities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Available Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.facilities.map((fac: string, idx: number) => (
                        <Badge key={idx} variant="outline">{fac}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>No storage facilities found</CardTitle>
              <CardDescription>
                Try adjusting your search criteria
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Storage Tips */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>Storage Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Ensure grains are properly dried before storage (moisture content below 12-14%)</p>
            <p>• Use clean, pest-free storage bags or containers</p>
            <p>• Store in well-ventilated areas away from moisture</p>
            <p>• Regular inspection for pest infestation is essential</p>
            <p>• Keep proper records of stored quantities and dates</p>
            <p>• Consider temperature-controlled storage for high-value crops</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Storage;
