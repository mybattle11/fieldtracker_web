import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  MapPin,
  Clock,
  Zap,
  Filter,
  RefreshCw,
  Eye,
} from "lucide-react";

interface ActiveEmployee {
  id: number;
  name: string;
  location: string;
  status: "Active" | "Idle" | "Offline";
  distance: number;
  lastUpdate: string;
  battery: number;
  department: string;
  coordinates: [number, number];
}

const activeEmployees: ActiveEmployee[] = [
  {
    id: 1,
    name: "John Smith",
    location: "Downtown Zone",
    status: "Active",
    distance: 12.5,
    lastUpdate: "2 min ago",
    battery: 85,
    department: "Sales",
    coordinates: [40.7128, -74.006],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "West District",
    status: "Active",
    distance: 24.3,
    lastUpdate: "1 min ago",
    battery: 92,
    department: "Field Ops",
    coordinates: [40.7589, -73.9851],
  },
  {
    id: 3,
    name: "Michael Brown",
    location: "East Sector",
    status: "Idle",
    distance: 8.2,
    lastUpdate: "15 min ago",
    battery: 45,
    department: "Sales",
    coordinates: [40.7614, -73.9776],
  },
  {
    id: 4,
    name: "Emily Davis",
    location: "North Ave",
    status: "Active",
    distance: 18.7,
    lastUpdate: "3 min ago",
    battery: 76,
    department: "Logistics",
    coordinates: [40.7505, -73.9972],
  },
  {
    id: 5,
    name: "James Wilson",
    location: "Central Hub",
    status: "Offline",
    distance: 0,
    lastUpdate: "45 min ago",
    battery: 12,
    department: "Field Ops",
    coordinates: [40.7549, -73.9840],
  },
];

export default function LiveTracking() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredEmployees = activeEmployees.filter((emp) => {
    const matchesDept = !selectedDepartment || emp.department === selectedDepartment;
    const matchesStatus = !selectedStatus || emp.status === selectedStatus;
    return matchesDept && matchesStatus;
  });

  const departments = [...new Set(activeEmployees.map((e) => e.department))];
  const statuses = ["Active", "Idle", "Offline"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/company-admin/dashboard")}
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
                <p className="text-xs text-muted-foreground">Live Tracking</p>
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
      <main className="h-[calc(100vh-64px)] flex">
        {/* Left Sidebar - Employee List */}
        <div className="w-full sm:w-96 border-r border-border bg-white flex flex-col">
          {/* Filters */}
          <div className="border-b border-border p-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Department
              </label>
              <select
                value={selectedDepartment || ""}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Status
              </label>
              <select
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Refresh: {refreshInterval}s
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="10"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {filteredEmployees.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() =>
                    navigate(`/company-admin/employee/${emp.id}`)
                  }
                  className="w-full text-left p-4 rounded-lg border border-border hover:border-secondary hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {emp.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {emp.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold ${
                          emp.status === "Active"
                            ? "bg-success/10 text-success"
                            : emp.status === "Idle"
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {emp.status}
                      </span>
                      <span className="text-muted-foreground">
                        {emp.distance} km
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Zap className="w-3 h-3" />
                      {emp.battery}%
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Updated {emp.lastUpdate}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-border p-4 bg-muted/30">
            <p className="text-sm font-semibold text-foreground mb-2">
              Summary
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Active</p>
                <p className="font-bold text-success">
                  {filteredEmployees.filter((e) => e.status === "Active")
                    .length}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Idle</p>
                <p className="font-bold text-warning">
                  {filteredEmployees.filter((e) => e.status === "Idle").length}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Offline</p>
                <p className="font-bold text-muted-foreground">
                  {filteredEmployees.filter((e) => e.status === "Offline")
                    .length}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-bold text-foreground">
                  {filteredEmployees.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Map Placeholder */}
        <div className="hidden sm:flex flex-1 bg-gradient-to-br from-primary/5 to-secondary/5 items-center justify-center relative overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.1)_1px,transparent_1px),linear-gradient(rgba(37,99,235,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />

          {/* Map Content */}
          <div className="relative z-10 text-center px-6">
            <div className="w-20 h-20 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Live Map View
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Real-time employee locations displayed on an interactive map. GPS
              tracking with 5-minute refresh intervals.
            </p>

            {/* Employee Markers Visualization */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-lg inline-block">
              <p className="text-sm font-semibold text-foreground mb-4">
                Active Markers: {filteredEmployees.length}
              </p>
              <div className="grid grid-cols-5 gap-3">
                {filteredEmployees.map((emp, idx) => (
                  <div
                    key={emp.id}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor:
                        emp.status === "Active"
                          ? "#10B981"
                          : emp.status === "Idle"
                            ? "#F59E0B"
                            : "#9CA3AF",
                    }}
                    title={emp.name}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Green = Active, Yellow = Idle, Gray = Offline
              </p>
            </div>
          </div>

          {/* Floating Action */}
          <button className="absolute bottom-6 right-6 bg-secondary text-secondary-foreground p-4 rounded-lg hover:bg-secondary/90 transition-colors shadow-lg flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </main>
    </div>
  );
}
