import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Super Admin Pages
import SuperAdminLogin from "./pages/SuperAdmin/Login";
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import Companies from "./pages/SuperAdmin/Companies";
import Billing from "./pages/SuperAdmin/Billing";
import PlatformAnalytics from "./pages/SuperAdmin/PlatformAnalytics";

// Company Admin Pages
import CompanyAdminLogin from "./pages/CompanyAdmin/Login";
import CompanyAdminDashboard from "./pages/CompanyAdmin/Dashboard";
import Employees from "./pages/CompanyAdmin/Employees";
import LiveTracking from "./pages/CompanyAdmin/LiveTracking";
import EmployeeDetail from "./pages/CompanyAdmin/EmployeeDetail";
import Geofencing from "./pages/CompanyAdmin/Geofencing";
import Reports from "./pages/CompanyAdmin/Reports";
import Settings from "./pages/CompanyAdmin/Settings";
import CompanyAdminAttendance from "./pages/CompanyAdmin/Attendance";
import VisitManagement from "./pages/CompanyAdmin/VisitManagement";
import Notifications from "./pages/CompanyAdmin/Notifications";
import Analytics from "./pages/CompanyAdmin/Analytics";

// Employee Pages
import EmployeeLogin from "./pages/Employee/Login";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import Visits from "./pages/Employee/Visits";
import Attendance from "./pages/Employee/Attendance";
import CheckIn from "./pages/Employee/CheckIn";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/super-admin/companies" element={<Companies />} />
          <Route path="/super-admin/billing" element={<Billing />} />
          <Route path="/super-admin/analytics" element={<PlatformAnalytics />} />

          {/* Company Admin Routes */}
          <Route
            path="/company-admin/login"
            element={<CompanyAdminLogin />}
          />
          <Route
            path="/company-admin/dashboard"
            element={<CompanyAdminDashboard />}
          />
          <Route path="/company-admin/employees" element={<Employees />} />
          <Route path="/company-admin/tracking" element={<LiveTracking />} />
          <Route
            path="/company-admin/employee/:id"
            element={<EmployeeDetail />}
          />
          <Route path="/company-admin/geofencing" element={<Geofencing />} />
          <Route path="/company-admin/reports" element={<Reports />} />
          <Route path="/company-admin/settings" element={<Settings />} />
          <Route path="/company-admin/attendance" element={<CompanyAdminAttendance />} />
          <Route path="/company-admin/visits" element={<VisitManagement />} />
          <Route path="/company-admin/notifications" element={<Notifications />} />
          <Route path="/company-admin/analytics" element={<Analytics />} />

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/visits" element={<Visits />} />
          <Route path="/employee/visits/add" element={<Visits />} />
          <Route path="/employee/attendance" element={<Attendance />} />
          <Route path="/employee/check-in" element={<CheckIn />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

if (import.meta.hot) {
  import.meta.hot.accept();
}
