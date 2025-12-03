import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Users,
  AlertCircle,
} from "lucide-react";

interface Geofence {
  id: number;
  name: string;
  location: string;
  radius: number;
  assignedEmployees: number;
  alertEntry: boolean;
  alertExit: boolean;
  createdDate: string;
}

const mockGeofences: Geofence[] = [
  {
    id: 1,
    name: "Main Office",
    location: "Downtown Business District",
    radius: 500,
    assignedEmployees: 45,
    alertEntry: true,
    alertExit: true,
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Warehouse Zone",
    location: "Industrial Area",
    radius: 1000,
    assignedEmployees: 28,
    alertEntry: true,
    alertExit: false,
    createdDate: "2024-01-05",
  },
  {
    id: 3,
    name: "Distribution Center",
    location: "North Avenue",
    radius: 800,
    assignedEmployees: 35,
    alertEntry: true,
    alertExit: true,
    createdDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Client A - Territory",
    location: "West District",
    radius: 2000,
    assignedEmployees: 12,
    alertEntry: false,
    alertExit: false,
    createdDate: "2024-01-15",
  },
];

export default function Geofencing() {
  const navigate = useNavigate();
  const [geofences, setGeofences] = useState(mockGeofences);
  const [showAddModal, setShowAddModal] = useState(false);

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
                <p className="text-xs text-muted-foreground">Geofencing</p>
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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Geofences
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage location-based zones and alerts
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Geofence
          </button>
        </div>

        {/* Geofences Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {geofences.map((geo) => (
            <div
              key={geo.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground">
                      {geo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {geo.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Radius</span>
                  <span className="font-semibold text-foreground">
                    {geo.radius} m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Assigned Employees
                  </span>
                  <span className="font-semibold text-foreground">
                    {geo.assignedEmployees}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">
                    {new Date(geo.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={geo.alertEntry}
                    readOnly
                    className="w-4 h-4 rounded border-input accent-secondary"
                  />
                  <span className="text-sm text-foreground">
                    Alert on Entry
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={geo.alertExit}
                    readOnly
                    className="w-4 h-4 rounded border-input accent-secondary"
                  />
                  <span className="text-sm text-foreground">Alert on Exit</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="w-20 h-20 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Geofence Map
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Interactive map view showing all geofences. Drag to create new
            zones or click existing zones to edit radius and settings.
          </p>
          <button className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Draw Geofence
          </button>
        </div>
      </main>

      {/* Add Geofence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Create New Geofence
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Main Office"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Downtown Business District"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Radius (meters)
                </label>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-input accent-secondary" />
                  <span className="text-sm text-foreground">
                    Alert on Entry
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-input accent-secondary" />
                  <span className="text-sm text-foreground">Alert on Exit</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
