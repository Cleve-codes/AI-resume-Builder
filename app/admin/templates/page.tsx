"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash, 
  MoreVertical,
  Lock,
  Unlock,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageNotification } from "@/app/hooks/usePageNotification";

// Mock template data
const mockTemplates = [
  {
    id: "1",
    name: "Professional",
    description: "A clean and professional template suitable for corporate environments.",
    thumbnail: "/templates/professional.png",
    isPremium: false,
    isActive: true,
    downloads: 1245,
    lastUpdated: "2023-09-10T14:23:54Z",
    category: "corporate"
  },
  {
    id: "2",
    name: "Modern Tech",
    description: "Clean, minimalist template perfect for tech professionals.",
    thumbnail: "/templates/modern-tech.png",
    isPremium: true,
    isActive: true,
    downloads: 876,
    lastUpdated: "2023-10-15T09:30:00Z",
    category: "tech"
  },
  {
    id: "3",
    name: "Creative",
    description: "Bold, colorful template for creative professionals.",
    thumbnail: "/templates/creative.png",
    isPremium: true,
    isActive: true,
    downloads: 723,
    lastUpdated: "2023-11-05T11:45:22Z",
    category: "creative"
  },
  {
    id: "4",
    name: "Academic",
    description: "Formal template suitable for academic and research positions.",
    thumbnail: "/templates/academic.png",
    isPremium: false,
    isActive: true,
    downloads: 492,
    lastUpdated: "2023-10-22T08:15:30Z",
    category: "academic"
  },
  {
    id: "5",
    name: "Minimal",
    description: "Simple and clean design with focus on content.",
    thumbnail: "/templates/minimal.png",
    isPremium: false,
    isActive: false,
    downloads: 367,
    lastUpdated: "2023-09-28T16:20:45Z",
    category: "general"
  },
  {
    id: "6",
    name: "Executive",
    description: "Sophisticated template for senior executives and managers.",
    thumbnail: "/templates/executive.png",
    isPremium: true,
    isActive: true,
    downloads: 589,
    lastUpdated: "2023-11-12T10:05:15Z",
    category: "corporate"
  }
];

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  isActive: boolean;
  downloads: number;
  lastUpdated: string;
  category: string;
}

export default function TemplateManagement() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Show template management notification
  usePageNotification({
    title: "Template Management",
    description: "Manage resume templates available to users",
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
    let filtered = [...templates];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        template => 
          template.name.toLowerCase().includes(query) || 
          template.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      if (categoryFilter === "premium") {
        filtered = filtered.filter(template => template.isPremium);
      } else if (categoryFilter === "free") {
        filtered = filtered.filter(template => !template.isPremium);
      } else if (categoryFilter === "inactive") {
        filtered = filtered.filter(template => !template.isActive);
      } else {
        filtered = filtered.filter(template => template.category === categoryFilter);
      }
    }
    
    setFilteredTemplates(filtered);
  }, [searchQuery, categoryFilter, templates]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template? This cannot be undone.")) {
      // In a real app, you would call an API endpoint
      setTemplates(templates.filter(template => template.id !== id));
      alert(`Template ${id} deleted`);
    }
  };

  const handleTogglePremium = (id: string, currentStatus: boolean) => {
    // In a real app, you would call an API endpoint
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, isPremium: !currentStatus } 
        : template
    ));
    alert(`Template ${id} is now ${currentStatus ? 'free' : 'premium'}`);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    // In a real app, you would call an API endpoint
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, isActive: !currentStatus } 
        : template
    ));
    alert(`Template ${id} is now ${currentStatus ? 'inactive' : 'active'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Template Management</h1>
          <p className="text-muted-foreground">
            Manage the resume templates available to users
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Template</DialogTitle>
              <DialogDescription>
                Fill in the details for the new resume template
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" placeholder="Template name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" className="col-span-3" placeholder="Template category" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" className="col-span-3" placeholder="Template description" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Thumbnail
                </Label>
                <Input id="image" type="file" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Premium</div>
                <div className="flex items-center space-x-2 col-span-3">
                  <input type="checkbox" id="premium" className="rounded" />
                  <Label htmlFor="premium">Make template premium only</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setCategoryFilter}>
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="corporate">Corporate</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-[200px] bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-5 bg-muted animate-pulse rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-3/4 mt-1"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className={template.isActive ? "" : "opacity-70"}>
              <div className="relative">
                <div className="h-[200px] bg-muted flex items-center justify-center overflow-hidden">
                  {/* In a real app, this would be an actual image */}
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                {template.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                    Premium
                  </Badge>
                )}
                {!template.isActive && (
                  <Badge className="absolute top-2 left-2 bg-red-100 text-red-800 hover:bg-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => alert(`View ${template.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Edit ${template.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePremium(template.id, template.isPremium)}>
                        {template.isPremium ? (
                          <>
                            <Unlock className="mr-2 h-4 w-4" />
                            Make Free
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Make Premium
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(template.id, template.isActive)}>
                        {template.isActive ? (
                          <>
                            <Eye className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">Deactivate</span>
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-green-500">Activate</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-500"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
                <div className="flex items-center">
                  <Download className="h-3 w-3 mr-1" />
                  {template.downloads} downloads
                </div>
                <div>Updated {formatDate(template.lastUpdated)}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 