import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Play, 
  Copy,
  Tag,
  X,
  Sparkles,
  Eye,
  Code
} from "lucide-react";
import { toast } from "sonner";

interface CodeEditorProps {
  onSave: (snippet: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const languages = [
  "javascript", "typescript", "python", "react", "vue", "angular",
  "css", "scss", "html", "sql", "bash", "php", "java", "c++",
  "c#", "go", "rust", "ruby", "kotlin", "swift"
];

const templates = {
  javascript: `// JavaScript function template
function exampleFunction(param) {
  // Your code here
  return param;
}

// Usage
const result = exampleFunction("Hello World");
console.log(result);`,
  
  react: `import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Your effect logic here
  }, []);
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
};

export default ExampleComponent;`,
  
  python: `# Python function template
def example_function(param):
    """
    Example function description
    """
    # Your code here
    return param

# Usage
result = example_function("Hello World")
print(result)`,
  
  css: `/* CSS styles template */
.example-class {
  /* Your styles here */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .example-class {
    flex-direction: column;
  }
}`,
  
  sql: `-- SQL query template
SELECT 
  column1,
  column2,
  COUNT(*) as total
FROM 
  table_name
WHERE 
  condition = 'value'
GROUP BY 
  column1, column2
ORDER BY 
  total DESC
LIMIT 10;`,
};

export const CodeEditor = ({ onSave, onCancel, initialData }: CodeEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [language, setLanguage] = useState(initialData?.language || "javascript");
  const [code, setCode] = useState(initialData?.code || templates.javascript);
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [isPreview, setIsPreview] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (!initialData && code === templates[language as keyof typeof templates]) {
      setCode(templates[newLanguage as keyof typeof templates] || "");
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!code.trim()) {
      toast.error("Please enter some code");
      return;
    }

    const snippet = {
      id: initialData?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      language,
      code,
      tags,
      isPublic,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: "Vansh Singh",
      likes: initialData?.likes || 0,
      forks: initialData?.forks || 0,
      views: initialData?.views || 0
    };

    onSave(snippet);
    toast.success(initialData ? "Snippet updated!" : "Snippet saved!");
  };

  const generateWithAI = () => {
    toast.info("AI generation will be implemented with OpenAI integration");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {initialData ? "Edit Snippet" : "Create New Snippet"}
        </h1>
        <p className="text-muted-foreground">
          Write, organize, and share your code with the community
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter snippet title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this snippet does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-muted/50 border-border/50 resize-none"
            />
          </div>

          {/* Language & AI Button */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover/95 backdrop-blur">
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={generateWithAI}
                className="border-primary/50 hover:bg-primary/10"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Generate
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="code">Code *</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                  className="h-8"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isPreview ? (
              <div className="min-h-[400px] bg-muted/30 rounded-md p-4 border border-border/30">
                <pre className="text-sm font-mono overflow-auto">
                  <code className="language-{language}">
                    {code}
                  </code>
                </pre>
              </div>
            ) : (
              <Textarea
                id="code"
                placeholder="Enter your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={20}
                className="bg-muted/30 border-border/30 font-mono text-sm resize-none"
              />
            )}
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                className="bg-muted/50 border-border/50"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddTag}
                className="border-border/50"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-border/30">
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public" className="text-sm">
                Make this snippet public
              </Label>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="border-border/50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-primary hover:opacity-90 shadow-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                {initialData ? "Update" : "Save"} Snippet
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setCode(templates[language as keyof typeof templates] || "")}
              >
                <Play className="h-4 w-4 mr-2" />
                Load Template
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleCopyCode}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={generateWithAI}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Enhance
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">💡 Pro Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Use descriptive titles for better searchability</li>
              <li>• Add relevant tags to help others find your code</li>
              <li>• Include comments in your code for clarity</li>
              <li>• Make snippets public to share with community</li>
              <li>• Use AI generation for boilerplate code</li>
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["react", "hooks", "javascript", "typescript", "css", "python", "api", "utils"].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => {
                    if (!tags.includes(tag)) {
                      setTags([...tags, tag]);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};