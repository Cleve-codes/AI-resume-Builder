"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Shield,
  UserX,
  Award,
  AlertTriangle,
  UserCheck,
  Mail,
  Download,
  UserPlus,
  Trash2,
  Edit,
  Ban,
  Eye,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageNotification } from "@/app/hooks/usePageNotification";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Zap } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    role: "user",
    plan: "premium",
    lastActive: "2023-12-15T14:30:00Z",
    joinDate: "2023-05-10T09:15:00Z",
    resumes: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    role: "user",
    plan: "premium",
    lastActive: "2023-12-14T11:45:00Z",
    joinDate: "2023-06-22T13:20:00Z",
    resumes: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    status: "inactive",
    role: "user",
    plan: "basic",
    lastActive: "2023-11-30T09:10:00Z",
    joinDate: "2023-04-15T10:30:00Z",
    resumes: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.w@example.com",
    status: "active",
    role: "user",
    plan: "free",
    lastActive: "2023-12-15T16:20:00Z",
    joinDate: "2023-09-05T14:45:00Z",
    resumes: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    status: "suspended",
    role: "user",
    plan: "basic",
    lastActive: "2023-10-20T08:30:00Z",
    joinDate: "2023-03-12T11:15:00Z",
    resumes: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    status: "active",
    role: "admin",
    plan: "enterprise",
    lastActive: "2023-12-15T15:10:00Z",
    joinDate: "2023-01-05T09:30:00Z",
    resumes: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.m@example.com",
    status: "active",
    role: "user",
    plan: "premium",
    lastActive: "2023-12-14T13:45:00Z",
    joinDate: "2023-07-18T10:20:00Z",
    resumes: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    status: "active",
    role: "user",
    plan: "basic",
    lastActive: "2023-12-13T11:30:00Z",
    joinDate: "2023-08-22T14:15:00Z",
    resumes: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Simulate loading data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }

    // Plan filter
    if (planFilter !== "all" && user.plan !== planFilter) {
      return false;
    }

    return true;
  });

  // Handle checkbox selection
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  // View user details
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(dateString);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <UserCheck className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <UserX className="h-3 w-3 mr-1" /> Suspended
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get plan badge
  const getPlanBadge = (plan) => {
    switch (plan) {
      case "free":
        return <Badge variant="outline">Free</Badge>;
      case "basic":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Basic
          </Badge>
        );
      case "premium":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Shield className="h-3 w-3 mr-1" /> Premium
          </Badge>
        );
      case "enterprise":
        return (
          <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
            Enterprise
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Users</h1>
            <p className="text-muted-foreground">Manage and monitor user accounts</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </motion.div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md mb-4">
              <span className="text-sm">{selectedUsers.length} users selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="p-3 w-[40px]">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3">User</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Last Active</th>
                    <th className="p-3">Joined</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b">
                        <td colSpan={7} className="p-3">
                          <div className="flex items-center space-x-4">
                            <div className="h-5 w-5 rounded-md bg-muted animate-pulse"></div>
                            <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-[200px] bg-muted rounded animate-pulse"></div>
                              <div className="h-3 w-[150px] bg-muted rounded animate-pulse"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-3 text-center">
                        No users found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                                {user.name.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{getStatusBadge(user.status)}</td>
                        <td className="p-3">{getPlanBadge(user.plan)}</td>
                        <td className="p-3">
                          <div className="text-sm">{getTimeAgo(user.lastActive)}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{formatDate(user.joinDate)}</div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="icon" onClick={() => handleViewUser(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the selected user</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-2xl">
                      {selectedUser.name.charAt(0)}
                      {selectedUser.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedUser.email}</p>
                  <div className="flex flex-col gap-2 w-full mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{getStatusBadge(selectedUser.status)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plan:</span>
                      <span>{getPlanBadge(selectedUser.plan)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Role:</span>
                      <Badge variant="outline">{selectedUser.role === "admin" ? "Admin" : "User"}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="resumes">Resumes</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Account Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">User ID:</span>
                              <span className="text-sm">{selectedUser.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Join Date:</span>
                              <span className="text-sm">{formatDate(selectedUser.joinDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Last Active:</span>
                              <span className="text-sm">{getTimeAgo(selectedUser.lastActive)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Usage Statistics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Resumes Created:</span>
                              <span className="text-sm">{selectedUser.resumes}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Job Applications:</span>
                              <span className="text-sm">12</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Downloads:</span>
                              <span className="text-sm">8</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Subscription Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Current Plan:</span>
                            <span className="text-sm">{getPlanBadge(selectedUser.plan)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Billing Cycle:</span>
                            <span className="text-sm">Monthly</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Next Billing Date:</span>
                            <span className="text-sm">January 15, 2024</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Payment Method:</span>
                            <span className="text-sm">Visa ending in 4242</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">No admin notes for this user.</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Recent Activity</h4>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-sm">Created a new resume</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                              <Download className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm">Downloaded resume as PDF</p>
                              <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <Zap className="h-4 w-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="text-sm">Upgraded to Premium plan</p>
                              <p className="text-xs text-muted-foreground">1 week ago</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <Edit className="h-4 w-4 text-amber-500" />
                            </div>
                            <div>
                              <p className="text-sm">Updated profile information</p>
                              <p className="text-xs text-muted-foreground">2 weeks ago</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Login History</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">Today, 2:30 PM</p>
                              <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Success
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">Yesterday, 10:15 AM</p>
                              <p className="text-xs text-muted-foreground">Safari on macOS</p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Success
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">Dec 12, 2023, 8:45 PM</p>
                              <p className="text-xs text-muted-foreground">Firefox on Windows</p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Success
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resumes">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">User Resumes</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Software Engineer Resume</p>
                                <p className="text-xs text-muted-foreground">Last updated: Dec 10, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">85% Score</Badge>
                          </div>

                          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Product Manager Resume</p>
                                <p className="text-xs text-muted-foreground">Last updated: Nov 28, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">78% Score</Badge>
                          </div>

                          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">UX Designer Resume</p>
                                <p className="text-xs text-muted-foreground">Last updated: Oct 15, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">92% Score</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="billing">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Billing Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Current Plan:</span>
                            <span className="text-sm">{getPlanBadge(selectedUser.plan)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Billing Cycle:</span>
                            <span className="text-sm">Monthly</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Amount:</span>
                            <span className="text-sm">$24.99/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Next Billing Date:</span>
                            <span className="text-sm">January 15, 2024</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Payment Method</h4>
                        <div className="flex items-center gap-3 p-3 border rounded-md">
                          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center">
                            <span className="text-xs font-medium">VISA</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Billing History</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">December 15, 2023</p>
                              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">$24.99</p>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Paid
                              </Badge>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">November 15, 2023</p>
                              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">$24.99</p>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Paid
                              </Badge>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">October 15, 2023</p>
                              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">$24.99</p>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Paid
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setUserDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 