import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    AlertCircle,
    CheckCircle,
    XCircle,
    Download,
    Filter,
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AttendanceRecord {
    id: number;
    employeeId: string;
    name: string;
    department: string;
    date: string;
    checkIn: string;
    checkOut: string;
    workHours: number;
    status: "Present" | "Late" | "Absent" | "Half Day" | "On Leave";
    location: string;
}

const mockAttendanceData: AttendanceRecord[] = [
    {
        id: 1,
        employeeId: "EMP001",
        name: "John Smith",
        department: "Sales",
        date: "2024-01-29",
        checkIn: "09:15 AM",
        checkOut: "06:30 PM",
        workHours: 9.25,
        status: "Present",
        location: "Main Office",
    },
    {
        id: 2,
        employeeId: "EMP002",
        name: "Sarah Johnson",
        department: "Marketing",
        date: "2024-01-29",
        checkIn: "08:45 AM",
        checkOut: "06:15 PM",
        workHours: 9.5,
        status: "Present",
        location: "Main Office",
    },
    {
        id: 3,
        employeeId: "EMP003",
        name: "Michael Brown",
        department: "Field Ops",
        date: "2024-01-29",
        checkIn: "10:30 AM",
        checkOut: "06:45 PM",
        workHours: 8.25,
        status: "Late",
        location: "Client Site A",
    },
    {
        id: 4,
        employeeId: "EMP004",
        name: "Emily Davis",
        department: "HR",
        date: "2024-01-29",
        checkIn: "--",
        checkOut: "--",
        workHours: 0,
        status: "Absent",
        location: "--",
    },
    {
        id: 5,
        employeeId: "EMP005",
        name: "James Wilson",
        department: "Field Ops",
        date: "2024-01-29",
        checkIn: "09:00 AM",
        checkOut: "01:30 PM",
        workHours: 4.5,
        status: "Half Day",
        location: "Main Office",
    },
];

export default function Attendance() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("2024-01-29");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // Calculate statistics
    const totalEmployees = mockAttendanceData.length;
    const presentCount = mockAttendanceData.filter(
        (r) => r.status === "Present" || r.status === "Late" || r.status === "Half Day"
    ).length;
    const lateCount = mockAttendanceData.filter((r) => r.status === "Late").length;
    const absentCount = mockAttendanceData.filter((r) => r.status === "Absent").length;

    // Filter data
    const filteredData = mockAttendanceData.filter((record) => {
        const matchesSearch =
            record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || record.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Present":
                return "default";
            case "Late":
                return "secondary";
            case "Absent":
                return "destructive";
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
                                <p className="text-xs text-muted-foreground">Attendance Management</p>
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
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                        Attendance Management
                    </h2>
                    <p className="text-muted-foreground">
                        Track and manage employee attendance, check-ins, and work hours
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmployees}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{presentCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{lateCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Absent</CardTitle>
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{absentCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Actions */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Date Picker */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Select Date
                                </label>
                                <Input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            {/* Search */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    <Search className="w-4 h-4 inline mr-2" />
                                    Search Employee
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Name or Employee ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    <Filter className="w-4 h-4 inline mr-2" />
                                    Filter Status
                                </label>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Present">Present</SelectItem>
                                        <SelectItem value="Late">Late</SelectItem>
                                        <SelectItem value="Absent">Absent</SelectItem>
                                        <SelectItem value="Half Day">Half Day</SelectItem>
                                        <SelectItem value="On Leave">On Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Export Button */}
                            <div className="flex items-end">
                                <Button variant="secondary">
                                    <Download className="w-4 h-4" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Attendance Table */}
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Check-In</TableHead>
                                <TableHead>Check-Out</TableHead>
                                <TableHead>Work Hours</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{record.employeeId}</TableCell>
                                    <TableCell className="font-medium">{record.name}</TableCell>
                                    <TableCell>{record.department}</TableCell>
                                    <TableCell>{record.checkIn}</TableCell>
                                    <TableCell>{record.checkOut}</TableCell>
                                    <TableCell>
                                        {record.workHours > 0 ? `${record.workHours} hrs` : "--"}
                                    </TableCell>
                                    <TableCell>{record.location}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(record.status)}>
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No attendance records found</p>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
