import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  MapPin,
  Clock,
  Navigation,
  Package,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const distanceData = [
  { day: "Mon", km: 45 },
  { day: "Tue", km: 52 },
  { day: "Wed", km: 48 },
  { day: "Thu", km: 61 },
  { day: "Fri", km: 58 },
  { day: "Sat", km: 35 },
];

const attendanceHistory = [
  { date: "2024-01-29", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: 9.25, status: "Present" },
  { date: "2024-01-26", checkIn: "08:45 AM", checkOut: "06:15 PM", hours: 9.5, status: "Present" },
  { date: "2024-01-25", checkIn: "09:30 AM", checkOut: "06:45 PM", hours: 9.25, status: "Late" },
  { date: "2024-01-24", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: 9, status: "Present" },
  { date: "2024-01-23", checkIn: "--", checkOut: "--", hours: 0, status: "Absent" },
];

const locationHistory = [
  { time: "09:15 AM", location: "Main Office", duration: "45 min" },
  { time: "10:00 AM", location: "Client A - Zone 1", duration: "2h 30min" },
  { time: "12:30 PM", location: "Lunch Break", duration: "1h" },
  { time: "01:30 PM", location: "Client B - Zone 2", duration: "3h 15min" },
  { time: "05:00 PM", location: "Return to Office", duration: "1h 30min" },
];

export default function EmployeeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

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
            <button
              onClick={() => navigate("/company-admin/employees")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  TrackedHub
                </h1>
                <p className="text-xs text-muted-foreground">Employee Detail</p>
              </div>
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
        {/* Employee Profile */}
        <div className="bg-white rounded-xl border border-border p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-bold text-3xl">
                JS
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  John Smith
                </h2>
                <p className="text-muted-foreground mb-4">EMP001</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-semibold text-foreground">Sales</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Designation</p>
                    <p className="font-semibold text-foreground">Sales Manager</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                      Active
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="font-semibold text-foreground">
                      Jan 15, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium">
                Edit
              </button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium">
                View Trail
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-border grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">john@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">+1-555-0101</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Current Location
                </p>
                <p className="font-medium text-foreground">Downtown Zone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Summary & Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Check-In Time
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  09:15 AM
                </p>
              </div>
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Distance Today
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  45 km
                </p>
              </div>
              <Navigation className="w-6 h-6 text-secondary" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Visits Completed
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">8</p>
              </div>
              <Package className="w-6 h-6 text-accent" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Hours Worked
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  8.5 h
                </p>
              </div>
              <Calendar className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Distance Chart */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Distance Traveled (Weekly)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
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

          {/* Location History */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Today's Location History
            </h3>
            <div className="space-y-3">
              {locationHistory.map((loc, idx) => (
                <div key={idx} className="flex gap-4 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0 text-sm font-semibold text-muted-foreground w-20">
                    {loc.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{loc.location}</p>
                    <p className="text-xs text-muted-foreground">{loc.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold text-foreground">
              Attendance History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Check-In
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Check-Out
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Hours
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.checkIn}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.checkOut}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {record.hours} h
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === "Present"
                            ? "bg-success/10 text-success"
                            : record.status === "Late"
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
