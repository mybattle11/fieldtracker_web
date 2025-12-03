import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Activity,
    BarChart3,
    PieChart,
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

const platformGrowthData = [
    { month: "Jan", companies: 8, employees: 1200, revenue: 12000 },
    { month: "Feb", companies: 12, employees: 1650, revenue: 15000 },
    { month: "Mar", companies: 15, employees: 2100, revenue: 18000 },
    { month: "Apr", companies: 19, employees: 2450, revenue: 21000 },
    { month: "May", companies: 22, employees: 2680, revenue: 25000 },
    { month: "Jun", companies: 28, employees: 2847, revenue: 28000 },
];

const planDistribution = [
    { name: "Basic", value: 12, revenue: 1188 },
    { name: "Pro", value: 8, revenue: 2392 },
    { name: "Enterprise", value: 8, revenue: 12000 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

interface CompanyMetrics {
    id: number;
    name: string;
    plan: string;
    employees: number;
    activeUsers: number;
    monthlyRevenue: number;
    growth: number;
}

const companyMetrics: CompanyMetrics[] = [
    {
        id: 1,
        name: "TechStart Inc",
        plan: "Enterprise",
        employees: 300,
        activeUsers: 285,
        monthlyRevenue: 1500,
        growth: 15,
    },
    {
        id: 2,
        name: "Prime Logistics",
        plan: "Pro",
        employees: 200,
        activeUsers: 192,
        monthlyRevenue: 299,
        growth: 8,
    },
    {
        id: 3,
        name: "Acme Corporation",
        plan: "Pro",
        employees: 150,
        activeUsers: 145,
        monthlyRevenue: 299,
        growth: 12,
    },
    {
        id: 4,
        name: "Global Services",
        plan: "Basic",
        employees: 45,
        activeUsers: 42,
        monthlyRevenue: 99,
        growth: 5,
    },
    {
        id: 5,
        name: "Innovation Labs",
        plan: "Basic",
        employees: 32,
        activeUsers: 28,
        monthlyRevenue: 99,
        growth: -3,
    },
];

export default function PlatformAnalytics() {
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState("6months");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const totalRevenue = planDistribution.reduce((sum, plan) => sum + plan.revenue, 0);
    const totalCompanies = planDistribution.reduce((sum, plan) => sum + plan.value, 0);
    const totalEmployees = 2847;
    const avgRevenuePerCompany = (totalRevenue / totalCompanies).toFixed(2);

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
                {/* Page Title */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                            Platform Analytics
                        </h2>
                        <p className="text-muted-foreground">
                            Comprehensive insights into platform-wide performance and growth
                        </p>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1month">Last Month</SelectItem>
                            <SelectItem value="3months">Last 3 Months</SelectItem>
                            <SelectItem value="6months">Last 6 Months</SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue (MRR)</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +15% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCompanies}</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +27% growth
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmployees.toLocaleString()}</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +18% growth
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Revenue/Company</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${avgRevenuePerCompany}</div>
                            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                                <TrendingDown className="w-3 h-3" />
                                -2% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Platform Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Growth</CardTitle>
                            <CardDescription>Companies and employees over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={platformGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="companies"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Companies"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="employees"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="Employees"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Plan Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Plan Distribution</CardTitle>
                            <CardDescription>Companies by subscription plan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsPieChart>
                                    <Pie
                                        data={planDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {planDistribution.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Trends */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Revenue Trends</CardTitle>
                        <CardDescription>Monthly recurring revenue growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={platformGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#f59e0b" name="Revenue ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Company Performance Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Performance</CardTitle>
                        <CardDescription>Detailed metrics for all companies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Employees</TableHead>
                                    <TableHead>Active Users</TableHead>
                                    <TableHead>Monthly Revenue</TableHead>
                                    <TableHead>Growth</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companyMetrics.map((company) => (
                                    <TableRow key={company.id}>
                                        <TableCell className="font-medium">{company.name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    company.plan === "Enterprise"
                                                        ? "default"
                                                        : company.plan === "Pro"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {company.plan}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{company.employees}</TableCell>
                                        <TableCell>
                                            {company.activeUsers} ({((company.activeUsers / company.employees) * 100).toFixed(0)}%)
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            ${company.monthlyRevenue}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`flex items-center gap-1 ${company.growth >= 0 ? "text-success" : "text-destructive"
                                                    }`}
                                            >
                                                {company.growth >= 0 ? (
                                                    <TrendingUp className="w-3 h-3" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3" />
                                                )}
                                                {Math.abs(company.growth)}%
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
