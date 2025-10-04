import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/config";

interface LanguageSelectorProps {
  variant?: "default" | "ghost" | "outline";
  showLabel?: boolean;
}

const LanguageSelector = ({ variant = "ghost", showLabel = false }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="gap-2">
          <Globe className="w-4 h-4" />
          {showLabel && <span className="hidden sm:inline">{currentLanguage.nativeName}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto bg-card z-50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            className={i18n.language === language.code ? "bg-accent" : ""}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="ml-2 text-muted-foreground text-sm">({language.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
