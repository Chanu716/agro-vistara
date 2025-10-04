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
import { Plus, IndianRupee, Calendar, Filter } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const Expenses = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [farms, setFarms] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    farm_id: "",
    expense_type: "",
    amount: "",
    description: "",
    expense_date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    checkAuth();
    fetchFarms();
    fetchExpenses();
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

    const { data } = await supabase
      .from('farms')
      .select('*')
      .eq('user_id', user.id);

    setFarms(data || []);
  };

  const fetchExpenses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('expenses')
      .select('*, farms(name)')
      .eq('user_id', user.id)
      .order('expense_date', { ascending: false });

    if (error) {
      toast.error("Failed to fetch expenses");
    } else {
      setExpenses(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('expenses')
      .insert([{
        ...formData,
        user_id: user.id,
        amount: parseFloat(formData.amount)
      }]);

    if (error) {
      toast.error("Failed to add expense");
    } else {
      toast.success("Expense added successfully!");
      setIsDialogOpen(false);
      setFormData({
        farm_id: "",
        expense_type: "",
        amount: "",
        description: "",
        expense_date: format(new Date(), 'yyyy-MM-dd')
      });
      fetchExpenses();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const expensesByType = expenses.reduce((acc, exp) => {
    acc[exp.expense_type] = (acc[exp.expense_type] || 0) + Number(exp.amount);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignOut={handleSignOut} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("expenses.title")}</h1>
            <p className="text-muted-foreground">{t("expenses.subtitle")}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("expenses.addExpense")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Record a farming expense
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farm">Farm *</Label>
                  <Select value={formData.farm_id} onValueChange={(value) => setFormData({ ...formData, farm_id: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm" />
                    </SelectTrigger>
                    <SelectContent>
                      {farms.map((farm) => (
                        <SelectItem key={farm.id} value={farm.id}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Expense Type *</Label>
                  <Select value={formData.expense_type} onValueChange={(value) => setFormData({ ...formData, expense_type: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seeds">Seeds</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer</SelectItem>
                      <SelectItem value="pesticide">Pesticide</SelectItem>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 5000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.expense_date}
                    onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">Add Expense</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">₹{totalExpenses.toLocaleString()}</p>
            </CardContent>
          </Card>

          {Object.entries(expensesByType).slice(0, 2).map(([type, amount]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="text-lg capitalize">{type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹{amount.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>No expenses recorded yet</CardTitle>
              <CardDescription>
                Start tracking your farming costs to analyze profitability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Expense
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold capitalize">{expense.expense_type}</h4>
                        <span className="text-sm text-muted-foreground">
                          {expense.farms?.name}
                        </span>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-muted-foreground">{expense.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(expense.expense_date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {Number(expense.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Expenses;
