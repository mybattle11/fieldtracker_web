import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapPin,
  LogOut,
  Clock,
  Navigation,
  Package,
  Bell,
  ArrowRight,
  Check,
  Plus,
} from "lucide-react";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || JSON.parse(user).role !== "employee") {
      navigate("/employee/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
              <p className="text-xs text-muted-foreground">Field Employee</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-1">
            Welcome, John
          </h2>
          <p className="text-muted-foreground">
            Monday, January 29, 2024 • 09:15 AM
          </p>
        </div>

        {/* Check-In/Out Button */}
        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-12 mb-8 shadow-lg">
          <button
            onClick={handleCheckInOut}
            className="w-full h-48 rounded-2xl bg-white/95 hover:bg-white transition-colors flex flex-col items-center justify-center gap-4 shadow-lg"
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold transition-all ${
                isCheckedIn
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-success hover:bg-success/90"
              }`}
            >
              {isCheckedIn ? "OUT" : "IN"}
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {isCheckedIn ? "Check Out" : "Check In"}
              </p>
              <p className="text-sm text-muted-foreground">
                Tap to {isCheckedIn ? "end" : "start"} your day
              </p>
            </div>
          </button>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Status</h3>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                isCheckedIn
                  ? "bg-success/10 text-success flex items-center gap-2"
                  : "bg-muted text-muted-foreground flex items-center gap-2"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  isCheckedIn ? "bg-success" : "bg-muted-foreground"
                }`}
              />
              {isCheckedIn ? "Checked In" : "Checked Out"}
            </span>
          </div>

          {isCheckedIn && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Check-In Time</p>
                    <p className="font-semibold text-foreground">09:15 AM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Distance Today
                    </p>
                    <p className="font-semibold text-foreground">45.2 km</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Visits Completed
                    </p>
                    <p className="font-semibold text-foreground">8 / 12</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => navigate("/employee/visits")}
            className="w-full bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-foreground">View Visits</p>
                <p className="text-xs text-muted-foreground">Today's schedule</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/employee/visits/add")}
            className="w-full bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-secondary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Add New Visit</p>
                <p className="text-xs text-muted-foreground">Log a customer visit</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/employee/attendance")}
            className="w-full bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Attendance</p>
                <p className="text-xs text-muted-foreground">View history</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            This Week
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-2xl font-bold text-foreground">42.5 h</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="text-2xl font-bold text-foreground">287 km</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visits</p>
              <p className="text-2xl font-bold text-foreground">38</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attendance</p>
              <p className="text-2xl font-bold text-success">100%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
