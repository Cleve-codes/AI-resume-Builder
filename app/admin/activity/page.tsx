"use client";

import { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  Loader2,
  Search,
  User,
  Users,
  FileUp,
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  BrainCircuit,
  CircleSlash,
} from "lucide-react";
import { usePageNotification } from "@/app/hooks/usePageNotification";

// Mock activity logs data
const mockLogs = [
  {
    id: "1",
    userId: "user123",
    userEmail: "john.doe@example.com",
    action: "create_resume",
    details: "Created a new resume using the Professional template",
    timestamp: "2023-11-25T14:23:54Z",
    status: "success",
    ip: "192.168.1.1",
    type: "user_action",
  },
  {
    id: "2",
    userId: "user456",
    userEmail: "jane.smith@example.com",
    action: "export_pdf",
    details: "Exported resume as PDF",
    timestamp: "2023-11-25T15:30:12Z",
    status: "success",
    ip: "192.168.1.2",
    type: "user_action",
  },
  {
    id: "3",
    userId: "admin001",
    userEmail: "admin@example.com",
    action: "update_template",
    details: "Updated Modern Tech template",
    timestamp: "2023-11-25T10:15:00Z",
    status: "success",
    ip: "192.168.1.3",
    type: "admin_action",
  },
  {
    id: "4",
    userId: null,
    userEmail: null,
    action: "system_backup",
    details: "Automated database backup completed",
    timestamp: "2023-11-25T02:00:00Z",
    status: "success",
    ip: null,
    type: "system",
  },
  {
    id: "5",
    userId: "user789",
    userEmail: "sam.wilson@example.com",
    action: "login_failed",
    details: "Failed login attempt",
    timestamp: "2023-11-25T08:45:30Z",
    status: "failed",
    ip: "192.168.1.4",
    type: "auth",
  },
  {
    id: "6",
    userId: "user123",
    userEmail: "john.doe@example.com",
    action: "generate_ai_content",
    details: "Generated AI-enhanced resume summary",
    timestamp: "2023-11-25T16:20:15Z",
    status: "success",
    ip: "192.168.1.1",
    type: "ai_action",
  },
  {
    id: "7",
    userId: "user456",
    userEmail: "jane.smith@example.com",
    action: "premium_subscription",
    details: "Purchased premium subscription",
    timestamp: "2023-11-24T11:10:05Z",
    status: "success",
    ip: "192.168.1.2",
    type: "payment",
  },
  {
    id: "8",
    userId: null,
    userEmail: null,
    action: "api_error",
    details: "OpenAI API timeout error",
    timestamp: "2023-11-24T18:05:22Z",
    status: "failed",
    ip: null,
    type: "system",
  },
  {
    id: "9",
    userId: "user789",
    userEmail: "sam.wilson@example.com",
    action: "email_verification",
    details: "Email verified successfully",
    timestamp: "2023-11-24T09:30:45Z",
    status: "success",
    ip: "192.168.1.4",
    type: "auth",
  },
  {
    id: "10",
    userId: "user123",
    userEmail: "john.doe@example.com",
    action: "upload_resume",
    details: "Uploaded existing resume for analysis",
    timestamp: "2023-11-24T14:50:33Z",
    status: "success",
    ip: "192.168.1.1",
    type: "user_action",
  },
];

interface ActivityLog {
  id: string;
  userId: string | null;
  userEmail: string | null;
  action: string;
  details: string;
  timestamp: string;
  status: "success" | "failed" | "pending";
  ip: string | null;
  type: "user_action" | "admin_action" | "auth" | "system" | "ai_action" | "payment";
}

// Map of action types to icons
const actionIcons: Record<string, React.ReactNode> = {
  create_resume: <FileText className="h-4 w-4" />,
  export_pdf: <Download className="h-4 w-4" />,
  update_template: <FileText className="h-4 w-4" />,
  system_backup: <Settings className="h-4 w-4" />,
  login_failed: <CircleSlash className="h-4 w-4" />,
  generate_ai_content: <BrainCircuit className="h-4 w-4" />,
  premium_subscription: <Lock className="h-4 w-4" />,
  api_error: <AlertTriangle className="h-4 w-4" />,
  email_verification: <CheckCircle className="h-4 w-4" />,
  upload_resume: <FileUp className="h-4 w-4" />,
};

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const logsPerPage = 10;

  // Show activity logs notification
  usePageNotification({
    title: "Activity Logs",
    description: "Monitor user activities and system events",
    duration: 4000,
    type: "info"
  });

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      // In a real app, you would fetch this from an API with pagination
      setLogs(mockLogs as ActivityLog[]);
      setTotalPages(Math.ceil(mockLogs.length / logsPerPage));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter logs based on search query, type filter, and status filter
  useEffect(() => {
    let filtered = [...logs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        log => 
          (log.userEmail?.toLowerCase().includes(query) || false) || 
          log.action.toLowerCase().includes(query) ||
          log.details.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(log => log.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(log => statusFilter.includes(log.status));
    }
    
    setFilteredLogs(filtered);
    setTotalPages(Math.ceil(filtered.length / logsPerPage));
    setPage(1); // Reset to first page when filters change
  }, [searchQuery, typeFilter, statusFilter, logs]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get icon for action type
  const getActionIcon = (action: string) => {
    return actionIcons[action] || <Info className="h-4 w-4" />;
  };

  // Get paginated logs
  const getPaginatedLogs = () => {
    const startIndex = (page - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    return filteredLogs.slice(startIndex, endIndex);
  };

  // Export logs as CSV
  const handleExportLogs = () => {
    // In a real app, you would implement CSV export
    alert("Exporting logs as CSV...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor user activities and system events
          </p>
        </div>
        <Button onClick={handleExportLogs}>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("success")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "success"]
                      : statusFilter.filter((s) => s !== "success")
                  );
                }}
              >
                Success
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("failed")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "failed"]
                      : statusFilter.filter((s) => s !== "failed")
                  );
                }}
              >
                Failed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("pending")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "pending"]
                      : statusFilter.filter((s) => s !== "pending")
                  );
                }}
              >
                Pending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setTypeFilter}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="user_action">User Actions</TabsTrigger>
          <TabsTrigger value="admin_action">Admin Actions</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="ai_action">AI Activities</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
          <TabsTrigger value="system">System Events</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading logs..."
              : `Showing ${Math.min(filteredLogs.length, logsPerPage)} of ${filteredLogs.length} logs`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading logs...</span>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No logs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setStatusFilter([]);
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPaginatedLogs().map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{formatDate(log.timestamp)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.userId ? (
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1 text-primary" />
                            <div className="text-sm">{log.userEmail}</div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-1 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground">System</div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            {getActionIcon(log.action)}
                          </div>
                          <span className="capitalize text-sm">
                            {log.action.replace(/_/g, " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        <span className="text-sm">{log.details}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(log.status)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {log.ip || "-"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 