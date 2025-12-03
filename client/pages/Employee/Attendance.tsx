import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, Calendar } from "lucide-react";

const attendanceData = [
  { date: "Jan 29", day: "Mon", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: 9.25, status: "Present" },
  { date: "Jan 26", day: "Fri", checkIn: "08:45 AM", checkOut: "06:15 PM", hours: 9.5, status: "Present" },
  { date: "Jan 25", day: "Thu", checkIn: "09:30 AM", checkOut: "06:45 PM", hours: 9.25, status: "Late" },
  { date: "Jan 24", day: "Wed", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: 9, status: "Present" },
  { date: "Jan 23", day: "Tue", checkIn: "--", checkOut: "--", hours: 0, status: "Absent" },
  { date: "Jan 22", day: "Mon", checkIn: "09:10 AM", checkOut: "06:20 PM", hours: 9.17, status: "Present" },
];

export default function Attendance() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalHours = attendanceData.reduce((sum, day) => sum + day.hours, 0);
  const presentDays = attendanceData.filter((d) => d.status === "Present").length;
  const absentDays = attendanceData.filter((d) => d.status === "Absent").length;
  const lateDays = attendanceData.filter((d) => d.status === "Late").length;

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
            <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
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
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Present</p>
            <p className="text-2xl font-bold text-success">{presentDays}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Late</p>
            <p className="text-2xl font-bold text-warning">{lateDays}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Absent</p>
            <p className="text-2xl font-bold text-destructive">{absentDays}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
            <p className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Day
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
                {attendanceData.map((record, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.day}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.checkIn}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.checkOut}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {record.hours > 0 ? `${record.hours.toFixed(2)}h` : "--"}
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
