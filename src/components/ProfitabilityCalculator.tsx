import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, DollarSign, Wheat } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CropProfitability {
  cropName: string;
  areaAcres: number;
  actualYieldKg?: number;
  expectedYieldKg?: number;
  totalExpenses: number;
  estimatedRevenue: number;
  profit: number;
  profitPerAcre: number;
  status: string;
}

const ProfitabilityCalculator = () => {
  const { t } = useTranslation();
  const [profitData, setProfitData] = useState<CropProfitability[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchProfitability();
  }, []);

  const fetchProfitability = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      type CropRecord = {
        id: string;
        crop_name: string;
        area_acres: number;
        actual_yield_kg: number | null;
        expected_yield_kg: number | null;
        status: string;
      };

      // Fetch all crop records
      const { data: crops } = await supabase
        .from('crop_records')
        .select('*')
        .eq('user_id', user.id) as { data: CropRecord[] | null };

      if (!crops || crops.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch expenses for each crop
      const { data: expenses } = await supabase
        .from('expenses')
        .select('crop_record_id, amount')
        .eq('user_id', user.id)
        .not('crop_record_id', 'is', null) as { data: { crop_record_id: string; amount: number }[] | null };

      // Calculate profitability for each crop
      const profitabilityData: CropProfitability[] = [];
      let sumProfit = 0;
      let sumRevenue = 0;
      let sumExpenses = 0;

      for (const crop of crops) {
        // Calculate expenses for this crop
        const cropExpenses = expenses
          ?.filter((e) => e.crop_record_id === crop.id)
          .reduce((sum, e) => sum + Number(e.amount), 0) || 0;

        // Use actual yield if harvested, otherwise expected yield
        const yieldKg = crop.actual_yield_kg || crop.expected_yield_kg || 0;

        // Estimate market price per kg (₹20-50 per kg for most crops, using ₹30 as average)
        // In a real app, this would come from crop_recommendations or market data
        const pricePerKg = 30;
        const estimatedRevenue = yieldKg * pricePerKg;

        const profit = estimatedRevenue - cropExpenses;
        const profitPerAcre = crop.area_acres ? profit / crop.area_acres : 0;

        profitabilityData.push({
          cropName: crop.crop_name,
          areaAcres: crop.area_acres,
          actualYieldKg: crop.actual_yield_kg,
          expectedYieldKg: crop.expected_yield_kg,
          totalExpenses: cropExpenses,
          estimatedRevenue,
          profit,
          profitPerAcre,
          status: crop.status,
        });

        sumProfit += profit;
        sumRevenue += estimatedRevenue;
        sumExpenses += cropExpenses;
      }

      setProfitData(profitabilityData);
      setTotalProfit(sumProfit);
      setTotalRevenue(sumRevenue);
      setTotalExpenses(sumExpenses);
    } catch (error) {
      console.error('Error fetching profitability:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('profitability.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('common.loading')}</p>
        </CardContent>
      </Card>
    );
  }

  if (profitData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('profitability.title')}</CardTitle>
          <CardDescription>{t('profitability.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Wheat className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t('profitability.noCrops')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              {t('profitability.totalRevenue')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              {t('profitability.totalExpenses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ₹{totalExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {totalProfit >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              {t('profitability.netProfit')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ₹{totalProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Profitability Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profitability.detailedAnalysis')}</CardTitle>
          <CardDescription>{t('profitability.cropWiseBreakdown')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('profitability.cropName')}</TableHead>
                  <TableHead className="text-right">{t('profitability.area')}</TableHead>
                  <TableHead className="text-right">{t('profitability.yield')}</TableHead>
                  <TableHead className="text-right">{t('profitability.expenses')}</TableHead>
                  <TableHead className="text-right">{t('profitability.revenue')}</TableHead>
                  <TableHead className="text-right">{t('profitability.profit')}</TableHead>
                  <TableHead className="text-right">{t('profitability.profitPerAcre')}</TableHead>
                  <TableHead>{t('profitability.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profitData.map((crop, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{crop.cropName}</TableCell>
                    <TableCell className="text-right">
                      {crop.areaAcres.toFixed(1)} {t('profitability.acresShort')}
                    </TableCell>
                    <TableCell className="text-right">
                      {(crop.actualYieldKg || crop.expectedYieldKg || 0).toFixed(0)} kg
                      {!crop.actualYieldKg && crop.expectedYieldKg && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({t('profitability.estimated')})
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-orange-600">
                      ₹{crop.totalExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-right text-blue-600">
                      ₹{crop.estimatedRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        crop.profit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      ₹{crop.profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        crop.profitPerAcre >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      ₹{crop.profitPerAcre.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          crop.status === 'harvested'
                            ? 'default'
                            : crop.status === 'growing'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {t(`profitability.status_${crop.status}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>* {t('profitability.note')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitabilityCalculator;
