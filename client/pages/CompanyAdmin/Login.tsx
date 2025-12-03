import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Eye, EyeOff, ArrowLeft, Building2 } from "lucide-react";

export default function CompanyAdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email === "manager@company.com" && password === "password") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            role: "company-admin",
            email: email,
            name: "Manager User",
            company: "Acme Corporation",
          })
        );
        navigate("/company-admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-green-50 to-secondary/10 flex flex-col">
      {/* Back Button */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">TrackedHub</h1>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Company Admin Login
            </h2>
            <p className="text-muted-foreground">
              Manage your company's employees and operations
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 border border-border/40"
          >
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="manager@company.com"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Demo: manager@company.com
              </p>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Demo: password
              </p>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-secondary"
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-secondary hover:text-secondary/80 transition-colors font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-900 font-medium mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-green-800">
              Email: <span className="font-mono">manager@company.com</span>
            </p>
            <p className="text-xs text-green-800">
              Password: <span className="font-mono">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
