import { Link } from "react-router-dom";
import { MapPin, Building2, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-50 to-primary/10 flex flex-col">
      {/* Header */}
      <header className="pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TrackedHub</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time employee tracking and management system
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Welcome to TrackedHub
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your role to access the employee tracking system
            </p>
          </div>

          {/* Login Options Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Super Admin Login */}
            <Link
              to="/super-admin/login"
              className="group animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Super Admin
                </h3>
                <p className="text-muted-foreground mb-4">
                  Manage companies, subscriptions, and system-wide analytics
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Company management</li>
                  <li>• Revenue analytics</li>
                  <li>• System monitoring</li>
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Sign In
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Company Admin Login */}
            <Link
              to="/company-admin/login"
              className="group animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/30">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Company Admin
                </h3>
                <p className="text-muted-foreground mb-4">
                  Manage employees, locations, and attendance tracking
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Employee management</li>
                  <li>• Live tracking</li>
                  <li>• Reports & analytics</li>
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                  Sign In
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Employee Login */}
            <Link
              to="/employee/login"
              className="group animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-accent/30">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Field Employee
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check in, track visits, and manage your daily tasks
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Check-in/out</li>
                  <li>• Visit tracking</li>
                  <li>• Attendance records</li>
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  Sign In
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Key Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Real-Time Tracking
                </h4>
                <p className="text-sm text-muted-foreground">
                  Track employee locations in real-time with precision mapping
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Attendance Management
                </h4>
                <p className="text-sm text-muted-foreground">
                  Automated check-in/out and attendance reporting
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Analytics & Reports
                </h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive reports and performance analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 TrackedHub. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
