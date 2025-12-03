import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  Plus,
  Search,
  Download,
  Edit2,
  Eye,
  Trash2,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: "Basic" | "Pro" | "Enterprise";
  employees: number;
  status: "Active" | "Inactive";
  registrationDate: string;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1-555-1001",
    plan: "Pro",
    employees: 150,
    status: "Active",
    registrationDate: "2024-01-15",
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "admin@techstart.com",
    phone: "+1-555-1002",
    plan: "Enterprise",
    employees: 300,
    status: "Active",
    registrationDate: "2024-01-18",
  },
  {
    id: 3,
    name: "Global Services",
    email: "hello@globalservices.com",
    phone: "+1-555-1003",
    plan: "Basic",
    employees: 45,
    status: "Active",
    registrationDate: "2024-01-22",
  },
  {
    id: 4,
    name: "Prime Logistics",
    email: "info@primelogistics.com",
    phone: "+1-555-1004",
    plan: "Pro",
    employees: 200,
    status: "Active",
    registrationDate: "2024-01-25",
  },
  {
    id: 5,
    name: "Innovation Labs",
    email: "contact@innovlabs.com",
    phone: "+1-555-1005",
    plan: "Basic",
    employees: 32,
    status: "Inactive",
    registrationDate: "2024-01-10",
  },
];

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Basic" as "Basic" | "Pro" | "Enterprise",
    employees: 0,
    status: "Active" as "Active" | "Inactive",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredCompanies = companies.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = selectedPlan === "all" || comp.plan === selectedPlan;
    const matchesStatus = selectedStatus === "all" || comp.status === selectedStatus;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleAdd = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "Basic",
      employees: 0,
      status: "Active",
    });
    setShowAddModal(true);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      email: company.email,
      phone: company.phone,
      plan: company.plan,
      employees: company.employees,
      status: company.status,
    });
    setShowEditModal(true);
  };

  const handleView = (company: Company) => {
    setSelectedCompany(company);
    setShowViewModal(true);
  };

  const handleDelete = (company: Company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const confirmAdd = () => {
    const newCompany: Company = {
      id: Math.max(...companies.map(c => c.id)) + 1,
      ...formData,
      registrationDate: new Date().toISOString().split('T')[0],
    };
    setCompanies([...companies, newCompany]);
    setShowAddModal(false);
  };

  const confirmEdit = () => {
    if (selectedCompany) {
      setCompanies(companies.map(c =>
        c.id === selectedCompany.id
          ? { ...c, ...formData }
          : c
      ));
      setShowEditModal(false);
    }
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      setCompanies(companies.filter(c => c.id !== selectedCompany.id));
      setShowDeleteModal(false);
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Plan", "Employees", "Status", "Registration Date"];
    const csvContent = [
      headers.join(","),
      ...companies.map(c => [
        c.id,
        `"${c.name}"`,
        c.email,
        c.phone,
        c.plan,
        c.employees,
        c.status,
        c.registrationDate
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "companies_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getPlanVariant = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "default";
      case "Pro":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    return status === "Active" ? "default" : "destructive";
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
              onClick={() => navigate("/super-admin/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">TrackedHub</h1>
                <p className="text-xs text-muted-foreground">Super Admin</p>
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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Companies</h2>
            <p className="text-muted-foreground mt-1">
              Manage all registered companies
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Plan Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Plan
                </label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Plans" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Status
                </label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companies Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>
                      <Badge variant={getPlanVariant(company.plan)}>
                        {company.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{company.employees}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(company.status)}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(company.registrationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(company)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(company)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(company)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <p className="text-muted-foreground">
                      No companies found matching your filters
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </main>

      {/* Add Company Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Register a new company to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="company@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1-555-0000"
                />
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select value={formData.plan} onValueChange={(value: any) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAdd}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Company Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update company information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Company Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-employees">Number of Employees</Label>
                <Input
                  id="edit-employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-plan">Subscription Plan</Label>
                <Select value={formData.plan} onValueChange={(value: any) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

      {/* View Company Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              View complete company information
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Company Name</Label>
                  <p className="font-medium">{selectedCompany.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedCompany.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedCompany.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Employees</Label>
                  <p className="font-medium">{selectedCompany.employees}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Plan</Label>
                  <div className="mt-1">
                    <Badge variant={getPlanVariant(selectedCompany.plan)}>
                      {selectedCompany.plan}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusVariant(selectedCompany.status)}>
                      {selectedCompany.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Registration Date</Label>
                <p className="font-medium">
                  {new Date(selectedCompany.registrationDate).toLocaleDateString()}
                </p>
              </div>
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
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this company? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="py-4">
              <p className="text-sm">
                You are about to delete <span className="font-bold">{selectedCompany.name}</span>.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
