import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  Bell,
  Clock,
  MapPin,
  Save,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
                <p className="text-xs text-muted-foreground">Settings</p>
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
          <p className="text-muted-foreground">
            Manage company settings and preferences
          </p>
        </div>

        {/* Company Profile Section */}
        <div className="bg-white rounded-xl border border-border p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Company Profile
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="Acme Corporation"
                className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="contact@acme.com"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1-555-1001"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Address
              </label>
              <input
                type="text"
                defaultValue="123 Business Avenue, Downtown District"
                className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
        </div>

        {/* Tracking Settings Section */}
        <div className="bg-white rounded-xl border border-border p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Tracking
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tracking Frequency (minutes)
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="1">1 minute (battery intensive)</option>
                <option value="5">5 minutes (recommended)</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Geofence Alert Sensitivity
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="high">High (very sensitive)</option>
                <option value="medium">Medium (default)</option>
                <option value="low">Low (lenient)</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input accent-secondary"
              />
              <span className="text-foreground">
                Enable background location tracking
              </span>
            </label>
          </div>
        </div>

        {/* Working Hours Section */}
        <div className="bg-white rounded-xl border border-border p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Working Hours & Attendance
          </h3>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Work Start Time
                </label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Work End Time
                </label>
                <input
                  type="time"
                  defaultValue="18:00"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Late Grace Period (minutes)
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-border p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input accent-secondary"
              />
              <span className="text-foreground">
                Geofence entry/exit alerts
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input accent-secondary"
              />
              <span className="text-foreground">
                Late check-in notifications
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input accent-secondary"
              />
              <span className="text-foreground">
                Employee status change alerts
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-input accent-secondary"
              />
              <span className="text-foreground">
                Daily summary reports via email
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isSaved && (
            <div className="flex-1 px-6 py-3 rounded-lg bg-success/10 text-success font-medium flex items-center justify-center gap-2">
              ✓ Settings saved successfully
            </div>
          )}
          {!isSaved && (
            <>
              <button className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
