import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  User, 
  Settings, 
  LogOut, 
  Code, 
  BookMarked,
  Users,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export const Header = ({ currentPage, onPageChange, onAuthClick, isAuthenticated }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPageChange("search");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onPageChange("home")}
        >
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Code className="h-6 w-6 text-primary-foreground animate-glow" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DevVault
            </span>
            <span className="text-xs text-muted-foreground -mt-1">AI-Powered</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            onClick={() => onPageChange("dashboard")}
            className="h-9"
          >
            <BookMarked className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={currentPage === "community" ? "default" : "ghost"}
            onClick={() => onPageChange("community")}
            className="h-9"
          >
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
          <Button
            variant={currentPage === "ai-search" ? "default" : "ghost"}
            onClick={() => onPageChange("ai-search")}
            className="h-9"
          >
            <Zap className="h-4 w-4 mr-2" />
            AI Search
          </Button>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search snippets with AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary transition-colors"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button 
                size="sm" 
                className="bg-gradient-primary hover:opacity-90 shadow-glow"
                onClick={() => onPageChange("new-snippet")}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Snippet
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        VS
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover/95 backdrop-blur" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Vansh Singh</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        vansh@devvault.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange("profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onAuthClick}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              onClick={onAuthClick}
              className="bg-gradient-primary hover:opacity-90 shadow-glow"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets with AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary transition-colors"
          />
        </form>
      </div>
    </header>
  );
};