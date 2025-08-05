import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SnippetCard } from "../dashboard/SnippetCard";
import { 
  Search, 
  TrendingUp, 
  Star, 
  Clock,
  Users,
  Code,
  Flame
} from "lucide-react";
import { toast } from "sonner";

// Mock community data
const trendingSnippets = [
  {
    id: "c1",
    title: "Advanced React Custom Hooks",
    description: "Collection of powerful custom hooks for React applications",
    language: "react",
    code: `export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};`,
    tags: ["react", "hooks", "custom", "utilities"],
    isPublic: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    author: "Alex Rodriguez",
    likes: 1240,
    forks: 185,
    views: 5600
  },
  {
    id: "c2",
    title: "Machine Learning Data Pipeline",
    description: "Complete ML pipeline with preprocessing and model training",
    language: "python",
    code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

class MLPipeline:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
    
    def preprocess(self, X):
        return self.scaler.fit_transform(X)
    
    def train(self, X, y):
        X_scaled = self.preprocess(X)
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        
        return classification_report(y_test, predictions)`,
    tags: ["python", "machine-learning", "scikit-learn", "pipeline"],
    isPublic: true,
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    author: "Sarah Chen",
    likes: 890,
    forks: 145,
    views: 3200
  },
  {
    id: "c3",
    title: "Modern CSS Animation Library",
    description: "Lightweight CSS animations with GPU acceleration",
    language: "css",
    code: `/* Modern CSS Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.animate-slide-up {
  animation: slideInUp 0.6s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.75s ease-in-out;
}`,
    tags: ["css", "animations", "gpu", "performance"],
    isPublic: true,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    author: "Mike Johnson",
    likes: 567,
    forks: 89,
    views: 2100
  }
];

const featuredDevelopers = [
  {
    name: "Alex Rodriguez",
    avatar: "AR",
    snippets: 45,
    followers: 1200,
    totalLikes: 5600,
    specialties: ["React", "TypeScript", "Node.js"]
  },
  {
    name: "Sarah Chen",
    avatar: "SC",
    snippets: 32,
    followers: 890,
    totalLikes: 4200,
    specialties: ["Python", "ML", "Data Science"]
  },
  {
    name: "Mike Johnson",
    avatar: "MJ",
    snippets: 28,
    followers: 650,
    totalLikes: 3100,
    specialties: ["CSS", "Animation", "Design"]
  }
];

export const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  const handleSnippetEdit = (snippet: any) => {
    toast.info("Fork snippet to edit it");
  };

  const handleSnippetDelete = (id: string) => {
    toast.info("You can only delete your own snippets");
  };

  const handleSnippetView = (snippet: any) => {
    toast.info("Snippet viewer will open here");
  };

  const handleFollowDeveloper = (name: string) => {
    toast.success(`Now following ${name}!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Community
          <span className="block text-2xl font-normal text-muted-foreground mt-2">
            Discover amazing code from developers worldwide
          </span>
        </h1>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 text-center hover:shadow-card transition-shadow">
          <Users className="h-8 w-8 text-vault-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-vault-purple mb-1">15,234</div>
          <div className="text-sm text-muted-foreground">Active Developers</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 text-center hover:shadow-card transition-shadow">
          <Code className="h-8 w-8 text-vault-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-vault-blue mb-1">52,891</div>
          <div className="text-sm text-muted-foreground">Public Snippets</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 text-center hover:shadow-card transition-shadow">
          <Star className="h-8 w-8 text-vault-pink mx-auto mb-2" />
          <div className="text-2xl font-bold text-vault-pink mb-1">234,567</div>
          <div className="text-sm text-muted-foreground">Total Likes</div>
        </div>
        
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 text-center hover:shadow-card transition-shadow">
          <TrendingUp className="h-8 w-8 text-vault-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-vault-green mb-1">1.2M</div>
          <div className="text-sm text-muted-foreground">Monthly Views</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search community snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Most Liked
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {trendingSnippets.map((snippet, index) => (
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
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {[...trendingSnippets].reverse().map((snippet, index) => (
                  <div key={`recent-${snippet.id}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <SnippetCard
                      snippet={snippet}
                      onEdit={handleSnippetEdit}
                      onDelete={handleSnippetDelete}
                      onView={handleSnippetView}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {[...trendingSnippets].sort((a, b) => b.likes - a.likes).map((snippet, index) => (
                  <div key={`popular-${snippet.id}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <SnippetCard
                      snippet={snippet}
                      onEdit={handleSnippetEdit}
                      onDelete={handleSnippetDelete}
                      onView={handleSnippetView}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Developers */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-vault-pink" />
              Featured Developers
            </h3>
            <div className="space-y-4">
              {featuredDevelopers.map((dev, index) => (
                <div 
                  key={dev.name} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                      {dev.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{dev.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {dev.snippets} snippets • {dev.followers} followers
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleFollowDeveloper(dev.name)}
                    className="text-xs"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-vault-green" />
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {["react", "python", "typescript", "css", "node.js", "machine-learning", "animation", "hooks", "sql", "docker"].map((tag, index) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Weekly Challenge
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Build a real-time chat component using React and WebSockets
            </p>
            <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90">
              Join Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};