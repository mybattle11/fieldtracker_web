import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  BarChart3,
} from "lucide-react";

export default function Reports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"attendance" | "travel" | "visits">("attendance");
  const [startDate, setStartDate] = useState("2024-01-22");
  const [endDate, setEndDate] = useState("2024-01-29");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const attendanceData = [
    { date: "2024-01-29", name: "John Smith", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: 9.25, status: "Present" },
    { date: "2024-01-29", name: "Sarah Johnson", checkIn: "08:45 AM", checkOut: "06:15 PM", hours: 9.5, status: "Present" },
    { date: "2024-01-29", name: "Michael Brown", checkIn: "10:30 AM", checkOut: "06:45 PM", hours: 8.25, status: "Late" },
    { date: "2024-01-29", name: "Emily Davis", checkIn: "--", checkOut: "--", hours: 0, status: "Absent" },
  ];

  const travelData = [
    { date: "2024-01-29", employee: "John Smith", distance: "45.2 km", locations: "6", duration: "8h 15m" },
    { date: "2024-01-29", employee: "Sarah Johnson", distance: "52.8 km", locations: "8", duration: "9h 30m" },
    { date: "2024-01-29", employee: "Michael Brown", distance: "38.5 km", locations: "5", duration: "8h" },
    { date: "2024-01-29", employee: "James Wilson", distance: "55.3 km", locations: "9", duration: "9h 45m" },
  ];

  const visitData = [
    { date: "2024-01-29", employee: "John Smith", customer: "ABC Corp", location: "Zone A", scheduled: "10:00 AM", actual: "10:15 AM", status: "Completed" },
    { date: "2024-01-29", employee: "Sarah Johnson", customer: "XYZ Ltd", location: "Zone B", scheduled: "02:00 PM", actual: "02:05 PM", status: "Completed" },
    { date: "2024-01-29", employee: "Michael Brown", customer: "Tech Innovations", location: "Zone C", scheduled: "03:30 PM", actual: "03:45 PM", status: "Completed" },
    { date: "2024-01-29", employee: "Emily Davis", customer: "Global Services", location: "Zone A", scheduled: "11:00 AM", actual: "--", status: "Pending" },
  ];

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
                <p className="text-xs text-muted-foreground">Reports</p>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Reports</h2>

          {/* Date Range Filter */}
          <div className="bg-white rounded-xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button className="px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium flex items-center gap-2 whitespace-nowrap mt-6 sm:mt-0">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
              activeTab === "attendance"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Attendance
            </div>
          </button>
          <button
            onClick={() => setActiveTab("travel")}
            className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
              activeTab === "travel"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Travel
            </div>
          </button>
          <button
            onClick={() => setActiveTab("visits")}
            className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
              activeTab === "visits"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Visits
            </div>
          </button>
        </div>

        {/* Report Tables */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  {activeTab === "attendance" && (
                    <>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Employee
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
                    </>
                  )}
                  {activeTab === "travel" && (
                    <>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Employee
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Distance
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Locations
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Duration
                      </th>
                    </>
                  )}
                  {activeTab === "visits" && (
                    <>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Employee
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Customer
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Location
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Time
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                        Status
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === "attendance" &&
                  attendanceData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.checkIn}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.checkOut}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.hours} h
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            row.status === "Present"
                              ? "bg-success/10 text-success"
                              : row.status === "Late"
                                ? "bg-warning/10 text-warning"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                {activeTab === "travel" &&
                  travelData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.employee}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.distance}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.locations} locations
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.duration}
                      </td>
                    </tr>
                  ))}
                {activeTab === "visits" &&
                  visitData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.employee}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {row.scheduled} → {row.actual}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            row.status === "Completed"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {row.status}
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
