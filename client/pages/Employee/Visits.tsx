import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, MapPin, Clock, CheckCircle, Plus } from "lucide-react";

const visits = [
  {
    id: 1,
    customer: "ABC Corporation",
    address: "123 Business St, Zone A",
    scheduled: "10:00 AM",
    status: "Completed",
    duration: "45 min",
  },
  {
    id: 2,
    customer: "XYZ Limited",
    address: "456 Commerce Ave, Zone B",
    scheduled: "01:00 PM",
    status: "Completed",
    duration: "1h 15m",
  },
  {
    id: 3,
    customer: "Tech Innovations",
    address: "789 Tech Park, Zone C",
    scheduled: "03:00 PM",
    status: "In Progress",
    duration: "30 min",
  },
  {
    id: 4,
    customer: "Global Services",
    address: "321 Enterprise Blvd, Zone A",
    scheduled: "04:30 PM",
    status: "Pending",
    duration: "--",
  },
];

export default function Visits() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/employee/dashboard")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Visits</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Today's Visits</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium">
            <Plus className="w-4 h-4" />
            Add Visit
          </button>
        </div>

        {/* Visits List */}
        <div className="space-y-4">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {visit.customer}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{visit.address}</span>
                  </div>
                </div>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                    visit.status === "Completed"
                      ? "bg-success/10 text-success"
                      : visit.status === "In Progress"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div className="flex items-center gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Scheduled: {visit.scheduled}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Duration: {visit.duration}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                {visit.status === "Pending" && (
                  <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium text-sm">
                    Navigate
                  </button>
                )}
                {visit.status === "In Progress" && (
                  <button className="px-4 py-2 rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-colors font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Mark Complete
                  </button>
                )}
                <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium text-sm">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
