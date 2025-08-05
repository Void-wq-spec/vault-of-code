import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Sparkles, 
  Zap,
  Brain,
  Lightbulb,
  Code,
  Copy,
  Star,
  TrendingUp,
  Clock
} from "lucide-react";
import { toast } from "sonner";

const aiSuggestions = [
  "Find React hooks for state management",
  "Show me Python data visualization snippets",
  "CSS animations for loading spinners",
  "SQL queries for user analytics",
  "JavaScript utility functions",
  "TypeScript interface examples"
];

const mockSearchResults = [
  {
    id: "ai1",
    title: "Advanced React State Management Hook",
    description: "Custom hook for complex state management with undo/redo functionality",
    language: "react",
    code: `const useStateHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentState = history[currentIndex];
  
  const setState = (newState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };
  
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  return {
    state: currentState,
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1
  };
};`,
    tags: ["react", "hooks", "state-management", "undo-redo"],
    relevanceScore: 98,
    author: "Sarah Chen",
    likes: 456,
    views: 2300
  },
  {
    id: "ai2",
    title: "Python Data Visualization Utility",
    description: "Comprehensive plotting functions for data analysis and visualization",
    language: "python",
    code: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

class DataVisualizer:
    def __init__(self, figsize=(12, 8)):
        plt.style.use('seaborn-v0_8')
        self.figsize = figsize
    
    def plot_correlation_heatmap(self, df, title="Correlation Matrix"):
        plt.figure(figsize=self.figsize)
        correlation_matrix = df.corr()
        
        sns.heatmap(
            correlation_matrix,
            annot=True,
            cmap='coolwarm',
            center=0,
            square=True,
            fmt='.2f'
        )
        
        plt.title(title, fontsize=16, fontweight='bold')
        plt.tight_layout()
        return plt
    
    def plot_distribution(self, data, column, bins=30):
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=self.figsize)
        
        # Histogram
        ax1.hist(data[column], bins=bins, alpha=0.7, color='skyblue')
        ax1.set_title(f'Distribution of {column}')
        ax1.set_xlabel(column)
        ax1.set_ylabel('Frequency')
        
        # Box plot
        ax2.boxplot(data[column])
        ax2.set_title(f'Box Plot of {column}')
        ax2.set_ylabel(column)
        
        plt.tight_layout()
        return fig`,
    tags: ["python", "matplotlib", "seaborn", "data-visualization"],
    relevanceScore: 95,
    author: "Mike Johnson",
    likes: 234,
    views: 1890
  },
  {
    id: "ai3",
    title: "CSS Loading Animation Collection",
    description: "Modern CSS-only loading animations with smooth transitions",
    language: "css",
    code: `/* Pulse Loading Animation */
.pulse-loader {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #3498db;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Spinning Dots */
.dot-spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.dot-spinner div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #3498db;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.dot-spinner div:nth-child(1) {
  left: 8px;
  animation: dot1 0.6s infinite;
}

.dot-spinner div:nth-child(2) {
  left: 8px;
  animation: dot2 0.6s infinite;
}

.dot-spinner div:nth-child(3) {
  left: 32px;
  animation: dot2 0.6s infinite;
}

.dot-spinner div:nth-child(4) {
  left: 56px;
  animation: dot3 0.6s infinite;
}

@keyframes dot1 {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

@keyframes dot3 {
  0% { transform: scale(1); }
  100% { transform: scale(0); }
}

@keyframes dot2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 0); }
}`,
    tags: ["css", "animations", "loading", "spinners"],
    relevanceScore: 92,
    author: "Alex Rodriguez",
    likes: 123,
    views: 1567
  }
];

export const AISearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    // Simulate AI search
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
      toast.success(`Found ${mockSearchResults.length} relevant snippets using AI`);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleLikeSnippet = (id: string) => {
    toast.success("Added to favorites!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary-foreground animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold">
            AI-Powered Search
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find exactly what you need with intelligent semantic search. 
          Describe what you want in natural language.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Smart Search
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Searches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <Brain className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                placeholder="Describe what you're looking for... (e.g., 'React hook for API calls with caching')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 pr-20 h-14 text-lg bg-muted/50 border-border/50 focus:border-primary"
              />
              <Button
                onClick={() => handleSearch()}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:opacity-90"
              >
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-vault-pink" />
              Try these AI-powered searches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4 text-left border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                AI Search Results
                <Badge className="bg-primary/20 text-primary">
                  {searchResults.length} found
                </Badge>
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map((result, index) => (
                  <Card 
                    key={result.id} 
                    className="group hover:shadow-elevated transition-all duration-300 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-primary/20 text-primary text-xs">
                              {result.relevanceScore}% match
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {result.language}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{result.title}</h4>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Code Preview */}
                      <div className="bg-muted/30 rounded-md p-3 mb-4 border border-border/30">
                        <pre className="text-xs text-muted-foreground font-mono overflow-hidden">
                          <code className="line-clamp-6">
                            {result.code}
                          </code>
                        </pre>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{result.author}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{result.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{result.views} views</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikeSnippet(result.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(result.code)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {isSearching && (
            <div className="text-center py-12">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-primary/20 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI is analyzing your request...</h3>
              <p className="text-muted-foreground">
                Searching through thousands of snippets to find the perfect match
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Trending AI Searches</h3>
            <p className="text-muted-foreground">
              See what the community is searching for with AI
            </p>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="text-center py-12">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Recent Searches</h3>
            <p className="text-muted-foreground">
              Your search history will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};