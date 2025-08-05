import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Code, 
  Search, 
  Users,
  Zap,
  Star,
  GitBranch
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const HeroSection = ({ onGetStarted, onLearnMore }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <div className="p-3 bg-vault-purple/20 backdrop-blur rounded-lg animate-float">
          <Code className="h-6 w-6 text-vault-purple" />
        </div>
      </div>
      <div className="absolute top-40 right-20 hidden lg:block">
        <div className="p-3 bg-vault-blue/20 backdrop-blur rounded-lg animate-float" style={{ animationDelay: '1s' }}>
          <Zap className="h-6 w-6 text-vault-blue" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 hidden lg:block">
        <div className="p-3 bg-vault-cyan/20 backdrop-blur rounded-lg animate-float" style={{ animationDelay: '2s' }}>
          <Search className="h-6 w-6 text-vault-cyan" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-slide-up">
            <Badge variant="secondary" className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Knowledge Management
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your Ultimate
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Code Vault
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Store, search, and share code snippets with AI-powered intelligence. 
            Build your personal knowledge base and collaborate with developers worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-4 h-auto"
              onClick={onGetStarted}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-4 h-auto"
              onClick={onLearnMore}
            >
              Watch Demo
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-vault-purple mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Code Snippets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-vault-blue mb-2">15K+</div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-vault-cyan mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-vault-green mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur rounded-full border border-border/50">
              <Zap className="h-4 w-4 text-vault-purple" />
              <span className="text-sm">AI-Powered Search</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur rounded-full border border-border/50">
              <Users className="h-4 w-4 text-vault-blue" />
              <span className="text-sm">Team Collaboration</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur rounded-full border border-border/50">
              <GitBranch className="h-4 w-4 text-vault-cyan" />
              <span className="text-sm">Version Control</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur rounded-full border border-border/50">
              <Star className="h-4 w-4 text-vault-green" />
              <span className="text-sm">Smart Tags</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};