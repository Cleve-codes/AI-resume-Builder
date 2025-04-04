"use client";

import { useState } from "react";
import { mockUsers } from "./data/mockUsers";
import { User, UserFilters } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getTimeAgo } from "./utils/formatDate";
import { UserDetailsDialog } from "./components/UserDetailsDialog";
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Mail, 
  Filter,
  Download,
  MoreHorizontal,
  Pencil,
  Lock, 
  Trash,
  User as UserIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [filters, setFilters] = useState<UserFilters>({
    status: [],
    role: [],
    plan: [],
    dateRange: [null, null],
    search: "",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const filteredUsers = users.filter((user) => {
    // Search filter
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !user.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status && filters.status.length > 0 && !filters.status.includes(user.status)) {
      return false;
    }
    
    // Role filter
    if (filters.role && filters.role.length > 0 && !filters.role.includes(user.role)) {
      return false;
    }
    
    // Plan filter
    if (filters.plan && filters.plan.length > 0 && !filters.plan.includes(user.plan)) {
      return false;
    }
    
    return true;
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'inactive':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'suspended':
        return 'bg-red-500 hover:bg-red-600';
      case 'pending':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('');
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage your application users and their access
          </p>
        </div>
        <Button className="flex items-center w-full sm:w-auto justify-center">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all users in the system
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="w-full sm:w-[300px] pl-8"
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Email Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Users
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          {isFilterExpanded && (
            <div className="bg-muted p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Button variant="outline" className="w-full justify-between">
                    <span>All Statuses</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <Button variant="outline" className="w-full justify-between">
                    <span>All Roles</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Plan</label>
                  <Button variant="outline" className="w-full justify-between">
                    <span>All Plans</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Button variant="outline" className="w-full justify-between">
                    <span>All Time</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Table View */}
          <div className="rounded-md border hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div 
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleUserClick(user)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.joinDate)}</TableCell>
                      <TableCell>{getTimeAgo(user.lastActive)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUserClick(user)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <UserIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No users found.</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="border rounded-md p-4 space-y-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleUserClick(user);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Lock className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Badge variant="secondary">
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 text-sm gap-y-1">
                    <div className="text-muted-foreground">Joined:</div>
                    <div>{formatDate(user.joinDate)}</div>
                    <div className="text-muted-foreground">Last Active:</div>
                    <div>{getTimeAgo(user.lastActive)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="w-1/2 sm:w-auto">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="w-1/2 sm:w-auto">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserDetailsDialog 
          user={selectedUser} 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      )}
    </div>
  );
}