import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Community } from "@/components/community/Community";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { AISearch } from "@/components/ai/AISearch";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePageChange = (page: string) => {
    if (!isAuthenticated && ["dashboard", "new-snippet"].includes(page)) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentPage(page);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setCurrentPage("home");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleNewSnippet = () => {
    setCurrentPage("new-snippet");
  };

  const handleSnippetSave = (snippet: any) => {
    console.log("Snippet saved:", snippet);
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNewSnippet={handleNewSnippet} />;
      case "community":
        return <Community />;
      case "ai-search":
        return <AISearch />;
      case "new-snippet":
        return (
          <CodeEditor
            onSave={handleSnippetSave}
            onCancel={() => setCurrentPage("dashboard")}
          />
        );
      default:
        return (
          <HeroSection
            onGetStarted={() => handlePageChange("dashboard")}
            onLearnMore={() => handlePageChange("community")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
      />
      
      {renderCurrentPage()}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Index;
