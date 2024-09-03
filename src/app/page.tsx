"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Clipboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";


const availableIcons = [
  "ableton", "activitypub", "actix", "adonis", "ae", "aiscript", "alpinejs", "anaconda", "androidstudio", "angular",
  "ansible", "apollo", "apple", "appwrite", "arch", "arduino", "astro", "atom", "au", "autocad",
  "aws", "azul", "azure", "babel", "bash", "bevy", "bitbucket", "blender", "bootstrap", "bsd",
  "bun", "c", "cs", "cpp", "crystal", "cassandra", "clion", "clojure", "cloudflare", "cmake",
  "codepen", "coffeescript", "css", "cypress", "d3", "dart", "debian", "deno", "devto", "discord",
  "bots", "discordjs", "django", "docker", "dotnet", "dynamodb", "eclipse", "elasticsearch", "electron", "elixir",
  "elysia", "emacs", "ember", "emotion", "express", "fastapi", "fediverse", "figma", "firebase", "flask",
  "flutter", "forth", "fortran", "gamemakerstudio", "gatsby", "gcp", "git", "github", "githubactions", "gitlab",
  "gmail", "gherkin", "go", "gradle", "godot", "grafana", "graphql", "gtk", "gulp", "haskell",
  "haxe", "haxeflixel", "heroku", "hibernate", "html", "htmx", "idea", "ai", "instagram", "ipfs",
  "java", "js", "jenkins", "jest", "jquery", "kafka", "kali", "kotlin", "ktor", "kubernetes",
  "laravel", "latex", "less", "linkedin", "linux", "lit", "lua", "md", "mastodon", "materialui",
  "matlab", "maven", "mint", "misskey", "mongodb", "mysql", "neovim", "nestjs", "netlify", "nextjs",
  "nginx", "nim", "nix", "nodejs", "notion", "npm", "nuxtjs", "obsidian", "ocaml", "octave",
  "opencv", "openshift", "openstack", "p5js", "perl", "ps", "php", "phpstorm", "pinia", "pkl",
  "plan9", "planetscale", "pnpm", "postgres", "postman", "powershell", "pr", "prisma", "processing", "prometheus",
  "pug", "pycharm", "py", "pytorch", "qt", "r", "rabbitmq", "rails", "raspberrypi", "react",
  "reactivex", "redhat", "redis", "redux", "regex", "remix", "replit", "rider", "robloxstudio", "rocket",
  "rollupjs", "ros", "ruby", "rust", "sass", "spring", "sqlite", "stackoverflow", "styledcomponents", "sublime",
  "supabase", "scala", "sklearn", "selenium", "sentry", "sequelize", "sketchup", "solidity", "solidjs", "svelte",
  "svg", "swift", "symfony", "tailwind", "tauri", "tensorflow", "terraform", "threejs", "twitter", "ts",
  "ubuntu", "unity", "unreal", "v", "vala", "vercel", "vim", "visualstudio", "vite", "vitest",
  "vscode", "vscodium", "vue", "vuetify", "wasm", "webflow", "webpack", "webstorm", "windicss", "windows",
  "wordpress", "workers", "xd", "yarn", "yew", "zig"
];


export default function IconBuilder() {
  const { theme, resolvedTheme } = useTheme();
  const selectedTheme = (resolvedTheme || theme) === "dark" ? "light" : "dark"; 
  const [search, setSearch] = useState("");
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [filteredIcons, setFilteredIcons] = useState(availableIcons);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isCentered, setIsCentered] = useState(false);
  const [iconsPerLine, setIconsPerLine] = useState(10);

  useEffect(() => {
    setFilteredIcons(
      availableIcons.filter((icon) =>
        icon.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setIsDarkTheme(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleIcon = (icon: string) => {
    setSelectedIcons((prev) =>
      prev.includes(icon) ? prev.filter((i) => i !== icon) : [...prev, icon]
    );
  };

  const generateUrl = () => {
    const baseUrl = "https://skillicons.dev/icons";
    const iconParams = selectedIcons.join(",");
    const themeParam = isDarkTheme ? "" : "&theme=light";
    const centerParam = isCentered ? "&center=true" : "";
    const perlineParam = iconsPerLine !== 15 ? `&perline=${iconsPerLine}` : "";
    return `${baseUrl}?i=${iconParams}${themeParam}${centerParam}${perlineParam}`;
  };

  const generateMarkdown = () => {
    const url = generateUrl();
    return `[![My Skills](${url})](https://skillicons.dev)\n\nMy Skills`;
  };

  const generateHtmlCentered = () => {
    const url = generateUrl();
    return `<p align="center">
    <a href="https://skillicons.dev">
      <img src="${url}" />
    </a>
  </p>`;
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (format: 'markdown' | 'html') => {
    const textToCopy = format === 'markdown' ? generateMarkdown() : generateHtmlCentered();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3 lg:sticky lg:top-4 lg:self-start">
        <h1 className="text-3xl font-bold mb-6 text-center" id="title">
          Skill Icon Builder
        </h1>
        <div className="mb-6 flex gap-2">
            <Input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <ModeToggle></ModeToggle>
          </div>
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div
              className={`flex flex-wrap gap-2 ${
                isCentered ? "justify-center" : ""
              }`}
            >
              <img
                src={generateUrl()}
                alt="Selected Skills"
                className="max-w-full"
              />
            </div>
          </Card>
          <div className="flex flex-wrap items-center gap-4 mb-6 mt-10">
            <div className="flex items-center gap-2">
              <Switch
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                id="theme-toggle"
              />
              <label htmlFor="theme-toggle">Dark Theme</label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={isCentered}
                onCheckedChange={setIsCentered}
                id="center-toggle"
              />
              <label htmlFor="center-toggle">Center Icons</label>
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <label htmlFor="icons-per-line">
                Icons per line: {iconsPerLine}
              </label>
              <Slider
                id="icons-per-line"
                min={1}
                max={50}
                step={1}
                value={[iconsPerLine]}
                onValueChange={([value]) => setIconsPerLine(value)}
                className="w-[113px] max-w-xs"
              />
            </div>
          </div>
          <Tabs defaultValue="markdown" className="w-full">
            <TabsList>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="html">HTML (Centered)</TabsTrigger>
            </TabsList>
            <TabsContent value="markdown">
              <div className="flex items-center gap-2">
                <Input value={generateMarkdown()} readOnly />
                <Button variant="outline" size="icon" onClick={() => handleCopy('markdown')}>
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="html">
              <div className="flex items-center gap-2">
                <Input value={generateHtmlCentered()} readOnly />
                <Button variant="outline" size="icon" onClick={() => handleCopy('html')}>
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
            {filteredIcons.map((icon) => (
              <Card
                key={icon}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedIcons.includes(icon)
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => toggleIcon(icon)}
              >
                <img
                  src={`https://skillicons.dev/icons?i=${icon}&theme=${selectedTheme}`}
                  alt={icon}
                  className="w-12 h-12 mx-auto mb-2"
                />
                <p className="text-center text-sm">{icon}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
