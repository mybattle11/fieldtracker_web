import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 28000 },
];

const companyGrowthData = [
  { month: "Jan", companies: 8 },
  { month: "Feb", companies: 12 },
  { month: "Mar", companies: 15 },
  { month: "Apr", companies: 19 },
  { month: "May", companies: 22 },
  { month: "Jun", companies: 28 },
];

const recentCompanies = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    plan: "Pro",
    employees: 150,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "admin@techstart.com",
    plan: "Enterprise",
    employees: 300,
    date: "2024-01-18",
  },
  {
    id: 3,
    name: "Global Services",
    email: "hello@globalservices.com",
    plan: "Basic",
    employees: 45,
    date: "2024-01-22",
  },
  {
    id: 4,
    name: "Prime Logistics",
    email: "info@primelogistics.com",
    plan: "Pro",
    employees: 200,
    date: "2024-01-25",
  },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/super-admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getPlanVariant = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "default";
      case "Pro":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">TrackedHub</h1>
              <span className="text-sm text-muted-foreground ml-4">
                Super Admin
              </span>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>


        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Admin
          </h2>
          <p className="text-muted-foreground">
            Here's your system overview and key metrics
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Companies
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28,500</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3" />
                All active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={companyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="companies" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Companies Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Company Registrations</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/super-admin/companies")}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      <Badge variant={getPlanVariant(company.plan)}>
                        {company.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>{company.employees}</TableCell>
                    <TableCell>
                      {new Date(company.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Button
            onClick={() => navigate("/super-admin/companies")}
            className="h-auto p-6 flex items-center justify-between group"
            size="lg"
          >
            <div className="text-left">
              <h4 className="font-bold text-lg mb-1">Companies</h4>
              <p className="text-sm opacity-90">Manage organizations</p>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={() => navigate("/super-admin/analytics")}
            variant="secondary"
            className="h-auto p-6 flex items-center justify-between group"
            size="lg"
          >
            <div className="text-left">
              <h4 className="font-bold text-lg mb-1">Platform Analytics</h4>
              <p className="text-sm opacity-90">View detailed reports</p>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={() => navigate("/super-admin/billing")}
            variant="destructive"
            className="h-auto p-6 flex items-center justify-between group"
            size="lg"
          >
            <div className="text-left">
              <h4 className="font-bold text-lg mb-1">Billing</h4>
              <p className="text-sm opacity-90">Subscriptions & payments</p>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  );
}
