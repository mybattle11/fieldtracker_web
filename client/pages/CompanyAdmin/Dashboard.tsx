import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Building2,
  Users,
  MapPin,
  Clock,
  Activity,
  TrendingUp,
  LogOut,
  ArrowRight,
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
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { date: "Mon", present: 45, absent: 5, late: 3 },
  { date: "Tue", present: 47, absent: 2, late: 2 },
  { date: "Wed", present: 48, absent: 3, late: 2 },
  { date: "Thu", present: 46, absent: 4, late: 3 },
  { date: "Fri", present: 49, absent: 1, late: 1 },
  { date: "Sat", present: 25, absent: 0, late: 0 },
];

const distanceData = [
  { day: "Week 1", km: 1200 },
  { day: "Week 2", km: 1450 },
  { day: "Week 3", km: 1380 },
  { day: "Week 4", km: 1620 },
];

const recentCheckIns = [
  {
    id: 1,
    name: "John Smith",
    time: "09:15 AM",
    location: "Main Office",
    type: "Check-In",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    time: "09:22 AM",
    location: "Zone A",
    type: "Check-In",
  },
  {
    id: 3,
    name: "Michael Brown",
    time: "09:30 AM",
    location: "Client Site",
    type: "Check-In",
  },
  {
    id: 4,
    name: "Emily Davis",
    time: "05:45 PM",
    location: "Main Office",
    type: "Check-Out",
  },
];

export default function CompanyAdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/company-admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
              <p className="text-xs text-muted-foreground">Acme Corporation</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Manager
          </h2>
          <p className="text-muted-foreground">
            Monday, January 29, 2024 • All systems operational
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Employees */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Employees
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">152</p>
                <p className="text-xs text-success mt-2">All active</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          {/* Active Today */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Active Today
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">148</p>
                <p className="text-xs text-success mt-2">97% attendance</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          {/* Distance Today */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Distance Today
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  1,240
                </p>
                <p className="text-xs text-foreground mt-2">km across fleet</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>

          {/* Avg Check-In Time */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Avg Check-In
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  9:18 AM
                </p>
                <p className="text-xs text-success mt-2">On time</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tracking */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Weekly Attendance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="present" stackId="a" fill="#10B981" />
                <Bar dataKey="absent" stackId="a" fill="#EF4444" />
                <Bar dataKey="late" stackId="a" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distance Traveled */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Distance Traveled (Weekly)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={distanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="km"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Check-ins and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Check-ins */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                Recent Check-Ins/Outs
              </h3>
              <button className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors font-medium text-sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentCheckIns.map((checkin) => (
                <div key={checkin.id} className="p-6 hover:bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                        {checkin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {checkin.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {checkin.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {checkin.time}
                      </p>
                      <span
                        className={`text-xs font-semibold ${
                          checkin.type === "Check-In"
                            ? "text-success"
                            : "text-accent"
                        }`}
                      >
                        {checkin.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/company-admin/tracking")}
              className="bg-secondary text-secondary-foreground rounded-xl p-6 hover:bg-secondary/90 transition-colors flex items-center justify-between group"
            >
              <div className="text-left">
                <h4 className="font-bold mb-1">Live Tracking</h4>
                <p className="text-sm opacity-90">View employees</p>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/company-admin/employees")}
              className="bg-primary text-primary-foreground rounded-xl p-6 hover:bg-primary/90 transition-colors flex items-center justify-between group"
            >
              <div className="text-left">
                <h4 className="font-bold mb-1">Manage Employees</h4>
                <p className="text-sm opacity-90">152 total</p>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/company-admin/reports")}
              className="bg-accent text-accent-foreground rounded-xl p-6 hover:bg-accent/90 transition-colors flex items-center justify-between group"
            >
              <div className="text-left">
                <h4 className="font-bold mb-1">View Reports</h4>
                <p className="text-sm opacity-90">Analytics</p>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
