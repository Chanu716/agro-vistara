import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Sprout, LayoutDashboard, Warehouse, TrendingUp, IndianRupee, MapPin, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

interface NavigationProps {
  onSignOut: () => void;
}

const Navigation = ({ onSignOut }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/farms', label: t('nav.myFarms'), icon: Sprout },
    { path: '/advisory', label: t('nav.advisory'), icon: TrendingUp },
    { path: '/expenses', label: t('nav.expenses'), icon: IndianRupee },
    { path: '/storage', label: t('nav.storage'), icon: MapPin },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground hidden md:block">Crop Manager</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button variant="ghost" onClick={onSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.signOut')}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(item.path)}
                className="gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
