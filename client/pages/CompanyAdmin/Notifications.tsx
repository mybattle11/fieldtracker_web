import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    ArrowLeft,
    Bell,
    CheckCircle,
    AlertCircle,
    Clock,
    MapPin,
    User,
    XCircle,
    Settings,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notification {
    id: number;
    type: "geofence" | "attendance" | "visit" | "alert" | "system";
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    priority: "high" | "medium" | "low";
    employeeName?: string;
    employeeId?: string;
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: "geofence",
        title: "Geofence Entry Alert",
        message: "John Smith entered Main Office geofence",
        timestamp: "2 minutes ago",
        isRead: false,
        priority: "medium",
        employeeName: "John Smith",
        employeeId: "EMP001",
    },
    {
        id: 2,
        type: "attendance",
        title: "Late Arrival",
        message: "Michael Brown checked in 30 minutes late",
        timestamp: "15 minutes ago",
        isRead: false,
        priority: "high",
        employeeName: "Michael Brown",
        employeeId: "EMP003",
    },
    {
        id: 3,
        type: "visit",
        title: "Visit Completed",
        message: "Sarah Johnson completed visit to ABC Corporation",
        timestamp: "1 hour ago",
        isRead: true,
        priority: "low",
        employeeName: "Sarah Johnson",
        employeeId: "EMP002",
    },
    {
        id: 4,
        type: "attendance",
        title: "Employee Absent",
        message: "Emily Davis has not checked in today",
        timestamp: "2 hours ago",
        isRead: false,
        priority: "high",
        employeeName: "Emily Davis",
        employeeId: "EMP004",
    },
    {
        id: 5,
        type: "geofence",
        title: "Geofence Exit Alert",
        message: "James Wilson exited Client Site A geofence",
        timestamp: "3 hours ago",
        isRead: true,
        priority: "medium",
        employeeName: "James Wilson",
        employeeId: "EMP005",
    },
    {
        id: 6,
        type: "visit",
        title: "Visit Started",
        message: "John Smith started visit to XYZ Limited",
        timestamp: "4 hours ago",
        isRead: true,
        priority: "low",
        employeeName: "John Smith",
        employeeId: "EMP001",
    },
    {
        id: 7,
        type: "alert",
        title: "Low Battery Warning",
        message: "Sarah Johnson's device battery is below 15%",
        timestamp: "5 hours ago",
        isRead: true,
        priority: "medium",
        employeeName: "Sarah Johnson",
        employeeId: "EMP002",
    },
    {
        id: 8,
        type: "system",
        title: "System Update",
        message: "Tracking system updated to version 2.1.0",
        timestamp: "1 day ago",
        isRead: true,
        priority: "low",
    },
];

export default function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filterType, setFilterType] = useState<string>("all");
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, isRead: true }))
        );
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    // Calculate statistics
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const highPriorityCount = notifications.filter(
        (n) => n.priority === "high" && !n.isRead
    ).length;

    // Filter notifications
    const filteredNotifications = notifications.filter((notif) => {
        const matchesType = filterType === "all" || notif.type === filterType;
        const matchesReadStatus = !showUnreadOnly || !notif.isRead;
        return matchesType && matchesReadStatus;
    });

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "geofence":
                return <MapPin className="w-5 h-5" />;
            case "attendance":
                return <Clock className="w-5 h-5" />;
            case "visit":
                return <CheckCircle className="w-5 h-5" />;
            case "alert":
                return <AlertCircle className="w-5 h-5" />;
            case "system":
                return <Settings className="w-5 h-5" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    const getPriorityVariant = (priority: string) => {
        switch (priority) {
            case "high":
                return "destructive";
            case "medium":
                return "secondary";
            case "low":
                return "outline";
            default:
                return "outline";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/company-admin/dashboard")}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
                                <p className="text-xs text-muted-foreground">Notifications</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                            Notifications & Alerts
                        </h2>
                        <p className="text-muted-foreground">
                            Stay updated with real-time alerts and system notifications
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="outline" onClick={markAllAsRead}>
                            Mark All as Read
                        </Button>
                    )}
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{notifications.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unread</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{unreadCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{highPriorityCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                            {/* Type Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    <Filter className="w-4 h-4 inline mr-2" />
                                    Filter by Type
                                </label>
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="geofence">Geofence Alerts</SelectItem>
                                        <SelectItem value="attendance">Attendance</SelectItem>
                                        <SelectItem value="visit">Visits</SelectItem>
                                        <SelectItem value="alert">System Alerts</SelectItem>
                                        <SelectItem value="system">System Updates</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Unread Toggle */}
                            <div className="flex items-center gap-3 mt-6 lg:mt-0">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showUnreadOnly}
                                        onChange={(e) => setShowUnreadOnly(e.target.checked)}
                                        className="w-4 h-4 rounded border-input text-secondary focus:ring-2 focus:ring-secondary"
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        Show Unread Only
                                    </span>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className={`transition-all hover:shadow-md ${!notification.isRead ? "border-l-4 border-l-secondary" : ""
                                }`}
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-muted">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3
                                                        className={`text-base font-bold ${!notification.isRead
                                                                ? "text-foreground"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {notification.title}
                                                    </h3>
                                                    <Badge variant={getPriorityVariant(notification.priority)}>
                                                        {notification.priority}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {notification.message}
                                                </p>
                                                {notification.employeeName && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <User className="w-4 h-4" />
                                                        <span>
                                                            {notification.employeeName} ({notification.employeeId})
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {notification.timestamp}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 mt-3">
                                            {!notification.isRead && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    Mark as Read
                                                </Button>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteNotification(notification.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredNotifications.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No notifications found</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
