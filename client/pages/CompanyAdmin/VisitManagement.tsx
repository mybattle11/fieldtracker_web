import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    ArrowLeft,
    Plus,
    MapPin,
    Clock,
    User,
    Calendar,
    CheckCircle,
    AlertCircle,
    XCircle,
    Eye,
    Edit2,
    Trash2,
    Search,
    Filter,
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
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Visit {
    id: number;
    employeeId: string;
    employeeName: string;
    customerName: string;
    location: string;
    address: string;
    scheduledDate: string;
    scheduledTime: string;
    actualStartTime?: string;
    actualEndTime?: string;
    status: "Scheduled" | "In Progress" | "Completed" | "Cancelled" | "Pending";
    notes?: string;
    duration?: string;
}

const initialVisits: Visit[] = [
    {
        id: 1,
        employeeId: "EMP001",
        employeeName: "John Smith",
        customerName: "ABC Corporation",
        location: "Downtown Zone A",
        address: "123 Business St, City",
        scheduledDate: "2024-01-29",
        scheduledTime: "10:00 AM",
        actualStartTime: "10:15 AM",
        actualEndTime: "11:30 AM",
        status: "Completed",
        notes: "Client meeting completed successfully",
        duration: "1h 15m",
    },
    {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Sarah Johnson",
        customerName: "XYZ Limited",
        location: "West District",
        address: "456 Commerce Ave, City",
        scheduledDate: "2024-01-29",
        scheduledTime: "02:00 PM",
        actualStartTime: "02:05 PM",
        status: "In Progress",
        notes: "",
    },
    {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Michael Brown",
        customerName: "Tech Innovations Inc",
        location: "East Zone",
        address: "789 Tech Park, City",
        scheduledDate: "2024-01-29",
        scheduledTime: "03:30 PM",
        status: "Scheduled",
        notes: "",
    },
];

export default function VisitManagement() {
    const navigate = useNavigate();
    const [visits, setVisits] = useState<Visit[]>(initialVisits);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        customerName: "",
        location: "",
        address: "",
        scheduledDate: "",
        scheduledTime: "",
        notes: "",
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // Calculate statistics
    const totalVisits = visits.length;
    const scheduledCount = visits.filter((v) => v.status === "Scheduled").length;
    const inProgressCount = visits.filter((v) => v.status === "In Progress").length;
    const completedCount = visits.filter((v) => v.status === "Completed").length;

    // Filter data
    const filteredVisits = visits.filter((visit) => {
        const matchesSearch =
            visit.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            visit.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            visit.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || visit.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleAdd = () => {
        setFormData({
            employeeId: "",
            employeeName: "",
            customerName: "",
            location: "",
            address: "",
            scheduledDate: "",
            scheduledTime: "",
            notes: "",
        });
        setShowAddModal(true);
    };

    const handleEdit = (visit: Visit) => {
        setSelectedVisit(visit);
        setFormData({
            employeeId: visit.employeeId,
            employeeName: visit.employeeName,
            customerName: visit.customerName,
            location: visit.location,
            address: visit.address,
            scheduledDate: visit.scheduledDate,
            scheduledTime: visit.scheduledTime,
            notes: visit.notes || "",
        });
        setShowEditModal(true);
    };

    const handleView = (visit: Visit) => {
        setSelectedVisit(visit);
        setShowViewModal(true);
    };

    const handleDelete = (visit: Visit) => {
        setSelectedVisit(visit);
        setShowDeleteModal(true);
    };

    const confirmAdd = () => {
        const newVisit: Visit = {
            id: Math.max(...visits.map(v => v.id)) + 1,
            ...formData,
            status: "Scheduled",
        };
        setVisits([...visits, newVisit]);
        setShowAddModal(false);
    };

    const confirmEdit = () => {
        if (selectedVisit) {
            setVisits(visits.map(v =>
                v.id === selectedVisit.id
                    ? { ...v, ...formData }
                    : v
            ));
            setShowEditModal(false);
        }
    };

    const confirmDelete = () => {
        if (selectedVisit) {
            setVisits(visits.filter(v => v.id !== selectedVisit.id));
            setShowDeleteModal(false);
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Completed":
                return "default";
            case "In Progress":
                return "secondary";
            case "Scheduled":
                return "outline";
            case "Cancelled":
                return "destructive";
            default:
                return "outline";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Completed":
                return <CheckCircle className="w-4 h-4" />;
            case "In Progress":
                return <Clock className="w-4 h-4" />;
            case "Scheduled":
                return <Calendar className="w-4 h-4" />;
            case "Cancelled":
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
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
                                <p className="text-xs text-muted-foreground">Visit Management</p>
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
                            Visit Scheduling & Management
                        </h2>
                        <p className="text-muted-foreground">
                            Schedule, track, and manage field visits and customer interactions
                        </p>
                    </div>
                    <Button onClick={handleAdd}>
                        <Plus className="w-5 h-5" />
                        Schedule Visit
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalVisits}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{scheduledCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{inProgressCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    <Search className="w-4 h-4 inline mr-2" />
                                    Search Visits
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Employee, customer, or location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

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
                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Visits List */}
                <div className="space-y-4">
                    {filteredVisits.map((visit) => (
                        <Card key={visit.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-foreground">
                                                {visit.customerName}
                                            </h3>
                                            <Badge variant={getStatusVariant(visit.status)}>
                                                {getStatusIcon(visit.status)}
                                                {visit.status}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <User className="w-4 h-4" />
                                                <span>{visit.employeeName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                <span>{visit.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                <span>{visit.scheduledDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>{visit.scheduledTime}</span>
                                            </div>
                                        </div>
                                        {visit.notes && (
                                            <div className="mt-2">
                                                <p className="text-sm text-muted-foreground">
                                                    <strong>Notes:</strong> {visit.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button variant="ghost" size="icon" onClick={() => handleView(visit)}>
                                            <Eye className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(visit)}>
                                            <Edit2 className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(visit)}>
                                            <Trash2 className="w-5 h-5 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredVisits.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No visits found</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>

            {/* Add/Schedule Visit Modal */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Schedule New Visit</DialogTitle>
                        <DialogDescription>
                            Create a new field visit for an employee
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="employeeId">Employee ID</Label>
                                <Input
                                    id="employeeId"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    placeholder="EMP001"
                                />
                            </div>
                            <div>
                                <Label htmlFor="employeeName">Employee Name</Label>
                                <Input
                                    id="employeeName"
                                    value={formData.employeeName}
                                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                                    placeholder="John Smith"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input
                                id="customerName"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                placeholder="ABC Corporation"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Downtown Zone A"
                                />
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="123 Business St"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                                <Input
                                    id="scheduledDate"
                                    type="date"
                                    value={formData.scheduledDate}
                                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="scheduledTime">Scheduled Time</Label>
                                <Input
                                    id="scheduledTime"
                                    type="time"
                                    value={formData.scheduledTime}
                                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Additional notes..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmAdd}>Schedule Visit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Visit Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Visit</DialogTitle>
                        <DialogDescription>
                            Update visit information
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit-employeeId">Employee ID</Label>
                                <Input
                                    id="edit-employeeId"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-employeeName">Employee Name</Label>
                                <Input
                                    id="edit-employeeName"
                                    value={formData.employeeName}
                                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit-customerName">Customer Name</Label>
                            <Input
                                id="edit-customerName"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit-location">Location</Label>
                                <Input
                                    id="edit-location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-address">Address</Label>
                                <Input
                                    id="edit-address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit-scheduledDate">Scheduled Date</Label>
                                <Input
                                    id="edit-scheduledDate"
                                    type="date"
                                    value={formData.scheduledDate}
                                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-scheduledTime">Scheduled Time</Label>
                                <Input
                                    id="edit-scheduledTime"
                                    type="time"
                                    value={formData.scheduledTime}
                                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit-notes">Notes</Label>
                            <Textarea
                                id="edit-notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Visit Modal */}
            <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Visit Details</DialogTitle>
                        <DialogDescription>
                            Complete visit information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedVisit && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Employee</Label>
                                    <p className="font-medium">{selectedVisit.employeeName} ({selectedVisit.employeeId})</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Customer</Label>
                                    <p className="font-medium">{selectedVisit.customerName}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Location</Label>
                                <p className="font-medium">{selectedVisit.location}</p>
                                <p className="text-sm text-muted-foreground">{selectedVisit.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Scheduled</Label>
                                    <p className="font-medium">{selectedVisit.scheduledDate} at {selectedVisit.scheduledTime}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Status</Label>
                                    <div className="mt-1">
                                        <Badge variant={getStatusVariant(selectedVisit.status)}>
                                            {getStatusIcon(selectedVisit.status)}
                                            {selectedVisit.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            {selectedVisit.notes && (
                                <div>
                                    <Label className="text-muted-foreground">Notes</Label>
                                    <p className="font-medium">{selectedVisit.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setShowViewModal(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Visit</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this visit? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedVisit && (
                        <div className="py-4">
                            <p className="text-sm">
                                You are about to delete the visit to <span className="font-bold">{selectedVisit.customerName}</span> scheduled for {selectedVisit.scheduledDate}.
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete Visit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
