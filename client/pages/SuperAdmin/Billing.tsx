import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  Download,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Plan {
  name: string;
  price: string;
  features: string[];
  companies: number;
}

const initialSubscriptionPlans: Plan[] = [
  {
    name: "Basic",
    price: "$99/month",
    features: ["Up to 50 employees", "Basic reporting", "Email support"],
    companies: 12,
  },
  {
    name: "Pro",
    price: "$299/month",
    features: ["Up to 200 employees", "Advanced analytics", "Priority support"],
    companies: 8,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited employees", "Custom features", "Dedicated support"],
    companies: 8,
  },
];

const paymentHistory = [
  {
    id: 1,
    company: "Acme Corporation",
    plan: "Pro",
    amount: "$299.00",
    date: "2024-01-29",
    status: "Paid",
  },
  {
    id: 2,
    company: "TechStart Inc",
    plan: "Enterprise",
    amount: "$1,500.00",
    date: "2024-01-29",
    status: "Paid",
  },
  {
    id: 3,
    company: "Prime Logistics",
    plan: "Pro",
    amount: "$299.00",
    date: "2024-01-28",
    status: "Paid",
  },
  {
    id: 4,
    company: "Global Services",
    plan: "Basic",
    amount: "$99.00",
    date: "2024-01-28",
    status: "Paid",
  },
];

export default function Billing() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>(initialSubscriptionPlans);

  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    features: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalRevenue = paymentHistory.reduce(
    (sum, payment) => sum + parseFloat(payment.amount.replace(/[$,]/g, "")),
    0
  );

  const handleExport = () => {
    const headers = ["ID", "Company", "Plan", "Amount", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...paymentHistory.map(p => [
        p.id,
        `"${p.company}"`,
        p.plan,
        `"${p.amount}"`,
        p.date,
        p.status
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "payments_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadInvoice = (paymentId: number) => {
    // Mock download functionality
    const content = `Invoice #${paymentId}\nDate: ${new Date().toISOString()}\nAmount: $299.00\nStatus: Paid`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${paymentId}.txt`;
    link.click();
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormData({
      price: plan.price,
      features: plan.features.join("\n"),
    });
    setShowEditModal(true);
  };

  const confirmEditPlan = () => {
    if (selectedPlan) {
      setPlans(plans.map(p =>
        p.name === selectedPlan.name
          ? {
            ...p,
            price: formData.price,
            features: formData.features.split("\n").filter(f => f.trim() !== "")
          }
          : p
      ));
      setShowEditModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/super-admin/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Billing & Subscriptions
          </h2>
          <p className="text-muted-foreground">
            Manage subscription plans and payment history
          </p>
        </div>

        {/* Revenue Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Monthly Revenue
                </p>
                <p className="text-4xl font-bold text-foreground mt-2">
                  ${totalRevenue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-success mt-2">
                  ↑ 15% from last month
                </p>
              </div>
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Subscription Plans
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {plan.price}
                </div>
                <CardDescription>{plan.companies} companies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-success">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEditPlan(plan)}
                >
                  Edit Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment History */}
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Payment History
        </h3>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments ({paymentHistory.length})</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.company}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell className="font-medium">{payment.amount}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{payment.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={() => handleDownloadInvoice(payment.id)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Edit Plan Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update pricing and features for {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="price">Monthly Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="$99/month"
              />
            </div>
            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Enter features..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
