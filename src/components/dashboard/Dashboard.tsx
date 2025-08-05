import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SnippetCard } from "./SnippetCard";
import { 
  Search, 
  Filter, 
  Plus,
  BookMarked,
  Star,
  Clock,
  Code,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface DashboardProps {
  onNewSnippet: () => void;
}

// Mock data
const mockSnippets = [
  {
    id: "1",
    title: "React useEffect Hook Pattern",
    description: "Advanced useEffect pattern for handling async operations with cleanup",
    language: "react",
    code: `useEffect(() => {
  let cancelled = false;
  
  const fetchData = async () => {
    try {
      const result = await api.getData();
      if (!cancelled) {
        setData(result);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, []);`,
    tags: ["react", "hooks", "async", "cleanup"],
    isPublic: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    author: "Vansh Singh",
    likes: 234,
    forks: 45,
    views: 1200
  },
  {
    id: "2",
    title: "Python Data Processing Pipeline",
    description: "Efficient data processing pipeline with pandas and error handling",
    language: "python",
    code: `import pandas as pd
from typing import Optional

def process_data(df: pd.DataFrame) -> Optional[pd.DataFrame]:
    try:
        # Clean data
        df_clean = df.dropna()
        
        # Transform
        df_clean['processed'] = df_clean['value'].apply(
            lambda x: x * 2 if x > 0 else 0
        )
        
        return df_clean
        
    except Exception as e:
        print(f"Error processing data: {e}")
        return None`,
    tags: ["python", "pandas", "data-processing", "pipeline"],
    isPublic: false,
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    author: "Vansh Singh",
    likes: 156,
    forks: 23,
    views: 890
  },
  {
    id: "3",
    title: "CSS Grid Layout Template",
    description: "Responsive CSS Grid layout with modern design patterns",
    language: "css",
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
}`,
    tags: ["css", "grid", "responsive", "modern"],
    isPublic: true,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    author: "Vansh Singh",
    likes: 89,
    forks: 12,
    views: 567
  },
  {
    id: "4",
    title: "SQL Optimization Query",
    description: "Optimized SQL query for complex joins and aggregations",
    language: "sql",
    code: `WITH ranked_sales AS (
  SELECT 
    product_id,
    customer_id,
    sale_amount,
    sale_date,
    ROW_NUMBER() OVER (
      PARTITION BY product_id 
      ORDER BY sale_amount DESC
    ) as rank
  FROM sales s
  WHERE sale_date >= CURRENT_DATE - INTERVAL '30 days'
),
top_sales AS (
  SELECT *
  FROM ranked_sales
  WHERE rank <= 5
)
SELECT 
  p.product_name,
  c.customer_name,
  ts.sale_amount,
  ts.sale_date
FROM top_sales ts
JOIN products p ON ts.product_id = p.id
JOIN customers c ON ts.customer_id = c.id
ORDER BY ts.sale_amount DESC;`,
    tags: ["sql", "optimization", "cte", "performance"],
    isPublic: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    author: "Vansh Singh",
    likes: 445,
    forks: 67,
    views: 2100
  }
];

export const Dashboard = ({ onNewSnippet }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");

  const handleSnippetEdit = (snippet: any) => {
    toast.info("Edit functionality will be implemented in snippet editor");
    onNewSnippet();
  };

  const handleSnippetDelete = (id: string) => {
    // In real app, this would delete from backend
    console.log("Deleting snippet:", id);
  };

  const handleSnippetView = (snippet: any) => {
    toast.info("Snippet viewer will open here");
  };

  const filteredSnippets = mockSnippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLanguage = filterLanguage === "all" || snippet.language === filterLanguage;
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "public" && snippet.isPublic) ||
                      (activeTab === "private" && !snippet.isPublic) ||
                      (activeTab === "favorites");

    return matchesSearch && matchesLanguage && matchesTab;
  });

  const languages = Array.from(new Set(mockSnippets.map(s => s.language)));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Code Vault</h1>
          <p className="text-muted-foreground">
            Manage your code snippets and build your knowledge base
          </p>
        </div>
        <Button 
          onClick={onNewSnippet}
          className="bg-gradient-primary hover:opacity-90 shadow-glow mt-4 lg:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Snippet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Snippets</p>
              <p className="text-2xl font-bold text-vault-purple">{mockSnippets.length}</p>
            </div>
            <BookMarked className="h-8 w-8 text-vault-purple/60" />
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Public Snippets</p>
              <p className="text-2xl font-bold text-vault-blue">
                {mockSnippets.filter(s => s.isPublic).length}
              </p>
            </div>
            <Code className="h-8 w-8 text-vault-blue/60" />
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Likes</p>
              <p className="text-2xl font-bold text-vault-pink">
                {mockSnippets.reduce((sum, s) => sum + s.likes, 0)}
              </p>
            </div>
            <Star className="h-8 w-8 text-vault-pink/60" />
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-vault-green">
                {mockSnippets.reduce((sum, s) => sum + s.views, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-vault-green/60" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>
        
        <Select value={filterLanguage} onValueChange={setFilterLanguage}>
          <SelectTrigger className="w-full lg:w-48 bg-muted/50 border-border/50">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-popover/95 backdrop-blur">
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map(lang => (
              <SelectItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-48 bg-muted/50 border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-popover/95 backdrop-blur">
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-96">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet, index) => (
          <div key={snippet.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <SnippetCard
              snippet={snippet}
              onEdit={handleSnippetEdit}
              onDelete={handleSnippetDelete}
              onView={handleSnippetView}
            />
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No snippets found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or create your first snippet
          </p>
          <Button onClick={onNewSnippet} className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Create Snippet
          </Button>
        </div>
      )}
    </div>
  );
};