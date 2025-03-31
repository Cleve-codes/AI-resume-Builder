"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageNotification } from "@/app/hooks/usePageNotification";

// Mock user data - in a real app, this would come from an API
const mockUsers = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    createdAt: "2023-09-10T14:23:54Z",
    isAdmin: false,
    isPremium: true,
    emailVerified: true,
    active: true,
    resumeCount: 5,
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    createdAt: "2023-10-05T09:15:22Z",
    isAdmin: false,
    isPremium: false,
    emailVerified: true,
    active: true,
    resumeCount: 2,
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    createdAt: "2023-08-01T00:00:00Z",
    isAdmin: true,
    isPremium: true,
    emailVerified: true,
    active: true,
    resumeCount: 3,
  },
  {
    id: "4",
    email: "sam.wilson@example.com",
    name: "Sam Wilson",
    createdAt: "2023-10-15T16:42:11Z",
    isAdmin: false,
    isPremium: false,
    emailVerified: false,
    active: true,
    resumeCount: 1,
  },
  {
    id: "5",
    email: "lisa.wong@example.com",
    name: "Lisa Wong",
    createdAt: "2023-11-20T11:33:45Z",
    isAdmin: false,
    isPremium: true,
    emailVerified: true,
    active: true,
    resumeCount: 7,
  },
  {
    id: "6",
    email: "mark.taylor@example.com",
    name: null,
    createdAt: "2023-11-25T08:19:32Z",
    isAdmin: false,
    isPremium: false,
    emailVerified: false,
    active: false,
    resumeCount: 0,
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterTab, setFilterTab] = useState("all");

  // Show user management notification
  usePageNotification({
    title: "User Management",
    description: "View and manage user accounts",
    duration: 4000,
    type: "info"
  });

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filteredUsers = [...mockUsers];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredUsers = filteredUsers.filter(
        user => 
          (user.name?.toLowerCase().includes(query) || false) || 
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (filterTab === 'admin') {
      filteredUsers = filteredUsers.filter(user => user.isAdmin);
    } else if (filterTab === 'premium') {
      filteredUsers = filteredUsers.filter(user => user.isPremium);
    } else if (filterTab === 'unverified') {
      filteredUsers = filteredUsers.filter(user => !user.emailVerified);
    } else if (filterTab === 'inactive') {
      filteredUsers = filteredUsers.filter(user => !user.active);
    }
    
    setUsers(filteredUsers);
  }, [searchQuery, filterTab]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handlePromoteToAdmin = (userId: string) => {
    // In a real app, you would call an API endpoint
    alert(`Promote user ${userId} to admin`);
  };

  const handleToggleActive = (userId: string, currentStatus: boolean) => {
    // In a real app, you would call an API endpoint
    alert(`${currentStatus ? 'Deactivate' : 'Activate'} user ${userId}`);
  };

  const handleTogglePremium = (userId: string, currentStatus: boolean) => {
    // In a real app, you would call an API endpoint
    alert(`${currentStatus ? 'Remove' : 'Add'} premium status for user ${userId}`);
  };

  const handleSendVerification = (userId: string) => {
    // In a real app, you would call an API endpoint
    alert(`Send verification email to user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          View, search, and manage user accounts.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilterTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Showing {users.length} out of {mockUsers.length} total users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Resumes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <div className="h-12 bg-muted animate-pulse rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No users found</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSearchQuery("");
                          setFilterTab("all");
                        }}
                      >
                        Reset filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {user.name || "Unnamed User"}
                        </span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.active ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Inactive
                        </Badge>
                      )}
                      {!user.emailVerified && (
                        <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                          Admin
                        </Badge>
                      ) : user.isPremium ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Free
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{user.resumeCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => alert(`View user ${user.id}`)}>
                            <Users className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`View resumes for user ${user.id}`)}>
                            <Award className="mr-2 h-4 w-4" />
                            View Resumes
                          </DropdownMenuItem>
                          {!user.isAdmin && (
                            <DropdownMenuItem onClick={() => handlePromoteToAdmin(user.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleTogglePremium(user.id, user.isPremium)}>
                            <Award className="mr-2 h-4 w-4" />
                            {user.isPremium ? 'Remove Premium' : 'Add Premium'}
                          </DropdownMenuItem>
                          {!user.emailVerified && (
                            <DropdownMenuItem onClick={() => handleSendVerification(user.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Verification
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleToggleActive(user.id, user.active)}>
                            {user.active ? (
                              <>
                                <UserX className="mr-2 h-4 w-4 text-red-500" />
                                <span className="text-red-500">Deactivate</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-green-500">Activate</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500" onClick={() => alert(`Delete user ${user.id}`)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 