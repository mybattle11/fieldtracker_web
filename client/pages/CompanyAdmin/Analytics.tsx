import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Users,
    MapPin,
    Clock,
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

const productivityData = [
    { day: "Mon", hours: 8.5, visits: 12, distance: 45 },
    { day: "Tue", hours: 9.2, visits: 15, distance: 52 },
    { day: "Wed", hours: 8.8, visits: 13, distance: 48 },
    { day: "Thu", hours: 9.5, visits: 16, distance: 58 },
    { day: "Fri", hours: 8.3, visits: 11, distance: 42 },
    { day: "Sat", hours: 7.5, visits: 9, distance: 35 },
    { day: "Sun", hours: 6.2, visits: 7, distance: 28 },
];

const departmentData = [
    { name: "Sales", value: 35, employees: 12 },
    { name: "Field Ops", value: 28, employees: 9 },
    { name: "Marketing", value: 18, employees: 6 },
    { name: "Support", value: 12, employees: 4 },
    { name: "HR", value: 7, employees: 2 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface EmployeePerformance {
    id: string;
    name: string;
    department: string;
    avgWorkHours: number;
    visitsCompleted: number;
    distanceTraveled: number;
    attendanceRate: number;
    efficiency: number;
}

const employeePerformance: EmployeePerformance[] = [
    {
        id: "EMP001",
        name: "John Smith",
        department: "Sales",
        avgWorkHours: 9.2,
        visitsCompleted: 45,
        distanceTraveled: 235,
        attendanceRate: 98,
        efficiency: 92,
    },
    {
        id: "EMP002",
        name: "Sarah Johnson",
        department: "Marketing",
        avgWorkHours: 8.8,
        visitsCompleted: 52,
        distanceTraveled: 198,
        attendanceRate: 100,
        efficiency: 95,
    },
    {
        id: "EMP003",
        name: "Michael Brown",
        department: "Field Ops",
        avgWorkHours: 8.5,
        visitsCompleted: 38,
        distanceTraveled: 267,
        attendanceRate: 95,
        efficiency: 88,
    },
    {
        id: "EMP004",
        name: "Emily Davis",
        department: "HR",
        avgWorkHours: 8.0,
        visitsCompleted: 28,
        distanceTraveled: 145,
        attendanceRate: 92,
        efficiency: 85,
    },
    {
        id: "EMP005",
        name: "James Wilson",
        department: "Field Ops",
        avgWorkHours: 9.0,
        visitsCompleted: 42,
        distanceTraveled: 289,
        attendanceRate: 97,
        efficiency: 90,
    },
];

export default function Analytics() {
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState("week");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
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
                            onClick={() => navigate("/company-admin/dashboard")}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
                                <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
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
                            Enhanced Analytics
                        </h2>
                        <p className="text-muted-foreground">
                            Comprehensive insights into productivity, performance, and efficiency
                        </p>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Work Hours</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8.6 hrs</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +12% from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">205</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +8% from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Idle Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.3 hrs</div>
                            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                                <TrendingDown className="w-3 h-3" />
                                -3% from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">91%</div>
                            <p className="text-xs text-success flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +15% from last week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Productivity Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Productivity Trends</CardTitle>
                            <CardDescription>Work hours and visits over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={productivityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Work Hours"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="Visits"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Department Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Distribution</CardTitle>
                            <CardDescription>Employee distribution by department</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsPieChart>
                                    <Pie
                                        data={departmentData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {departmentData.map((entry, index) => (
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

                {/* Distance Traveled Chart */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Distance Traveled</CardTitle>
                        <CardDescription>Total distance covered by field team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="distance" fill="#f59e0b" name="Distance (km)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Employee Performance Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Performance Comparison</CardTitle>
                        <CardDescription>Detailed metrics for all employees</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Avg Hours</TableHead>
                                    <TableHead>Visits</TableHead>
                                    <TableHead>Distance (km)</TableHead>
                                    <TableHead>Attendance</TableHead>
                                    <TableHead>Efficiency</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employeePerformance.map((emp) => (
                                    <TableRow key={emp.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{emp.name}</p>
                                                <p className="text-xs text-muted-foreground">{emp.id}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{emp.department}</TableCell>
                                        <TableCell>{emp.avgWorkHours} hrs</TableCell>
                                        <TableCell>{emp.visitsCompleted}</TableCell>
                                        <TableCell>{emp.distanceTraveled} km</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={emp.attendanceRate >= 95 ? "default" : "secondary"}
                                            >
                                                {emp.attendanceRate}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden max-w-[100px]">
                                                    <div
                                                        className="bg-secondary h-full"
                                                        style={{ width: `${emp.efficiency}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {emp.efficiency}%
                                                </span>
                                            </div>
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
