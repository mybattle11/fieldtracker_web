import { useNavigate, useLocation } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuperAdminNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="border-b border-border bg-white sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">TrackedHub</h1>
                        <span className="text-sm text-muted-foreground ml-4">
                            Super Admin
                        </span>
                    </div>
                    <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-4 flex gap-1">
                    <Button
                        variant={isActive("/super-admin/dashboard") ? "secondary" : "ghost"}
                        onClick={() => navigate("/super-admin/dashboard")}
                        className="text-sm"
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant={isActive("/super-admin/companies") ? "secondary" : "ghost"}
                        onClick={() => navigate("/super-admin/companies")}
                        className="text-sm"
                    >
                        Companies
                    </Button>
                    <Button
                        variant={isActive("/super-admin/billing") ? "secondary" : "ghost"}
                        onClick={() => navigate("/super-admin/billing")}
                        className="text-sm"
                    >
                        Billing & Subscriptions
                    </Button>
                    <Button
                        variant={isActive("/super-admin/analytics") ? "secondary" : "ghost"}
                        onClick={() => navigate("/super-admin/analytics")}
                        className="text-sm"
                    >
                        Platform Analytics
                    </Button>
                </nav>
            </div>
        </header>
    );
}
