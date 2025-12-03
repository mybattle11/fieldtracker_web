import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  LogOut,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Upload,
  Edit2,
  Eye,
  Trash2,
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  phone: string;
  email: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive" | "On Leave";
  profilePhoto?: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    employeeId: "EMP001",
    phone: "+1-555-0101",
    email: "john@company.com",
    department: "Sales",
    designation: "Sales Manager",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    employeeId: "EMP002",
    phone: "+1-555-0102",
    email: "sarah@company.com",
    department: "Field Operations",
    designation: "Territory Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    employeeId: "EMP003",
    phone: "+1-555-0103",
    email: "michael@company.com",
    department: "Sales",
    designation: "Sales Executive",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    employeeId: "EMP004",
    phone: "+1-555-0104",
    email: "emily@company.com",
    department: "Logistics",
    designation: "Delivery Agent",
    status: "On Leave",
  },
  {
    id: 5,
    name: "James Wilson",
    employeeId: "EMP005",
    phone: "+1-555-0105",
    email: "james@company.com",
    department: "Field Operations",
    designation: "Field Agent",
    status: "Inactive",
  },
];

export default function EmployeeManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [employees, setEmployees] = useState(mockEmployees);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !selectedStatus || emp.status === selectedStatus;
    const matchesDepartment =
      !selectedDepartment || emp.department === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(employees.map((e) => e.department))];
  const statuses = ["Active", "Inactive", "On Leave"];

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
                <p className="text-xs text-muted-foreground">Company Admin</p>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Employees</h2>
            <p className="text-muted-foreground mt-1">
              Manage all employees across {employees.length} records
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium">
              <Upload className="w-4 h-4" />
              Bulk Import
            </button>
            <button
              onClick={() => navigate("/company-admin/employee/add")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Status
              </label>
              <select
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Department
              </label>
              <select
                value={selectedDepartment || ""}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Employee ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Department
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Designation
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">
                            {employee.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">
                            {employee.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {employee.employeeId}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-muted-foreground">
                          {employee.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {employee.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === "Active"
                              ? "bg-success/10 text-success"
                              : employee.status === "On Leave"
                                ? "bg-warning/10 text-warning"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/company-admin/employee/${employee.id}`
                              )
                            }
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-muted-foreground">
                        No employees found matching your filters
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
