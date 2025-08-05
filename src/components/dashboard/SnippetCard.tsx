import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Copy, 
  Edit, 
  Trash2, 
  Star, 
  Eye,
  GitFork,
  Calendar,
  User
} from "lucide-react";
import { toast } from "sonner";

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
  likes: number;
  forks: number;
  views: number;
}

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onView: (snippet: Snippet) => void;
}

const languageColors: Record<string, string> = {
  javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  typescript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  python: "bg-green-500/20 text-green-400 border-green-500/30",
  react: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  css: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  html: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  sql: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  bash: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export const SnippetCard = ({ snippet, onEdit, onDelete, onView }: SnippetCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleDelete = () => {
    onDelete(snippet.id);
    toast.success("Snippet deleted successfully");
  };

  const getLanguageColor = (language: string) => {
    return languageColors[language.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-lg truncate cursor-pointer hover:text-primary transition-colors"
              onClick={() => onView(snippet)}
            >
              {snippet.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {snippet.description}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur">
              <DropdownMenuItem onClick={() => onView(snippet)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(snippet)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Badge className={`text-xs ${getLanguageColor(snippet.language)}`}>
            {snippet.language}
          </Badge>
          {snippet.isPublic && (
            <Badge variant="outline" className="text-xs">
              Public
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Code Preview */}
        <div className="bg-muted/30 rounded-md p-3 mb-4 border border-border/30">
          <pre className="text-sm text-muted-foreground font-mono overflow-hidden">
            <code className="line-clamp-3">
              {snippet.code}
            </code>
          </pre>
        </div>

        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {snippet.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {snippet.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{snippet.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{snippet.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{snippet.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{snippet.forks}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-8 w-8 p-0 ${isLiked ? 'text-yellow-400' : 'text-muted-foreground'}`}
            >
              <Star className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{snippet.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};