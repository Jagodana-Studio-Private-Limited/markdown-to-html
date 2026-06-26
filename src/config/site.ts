export const siteConfig = {
  name: "Markdown to HTML",
  title: "Markdown to HTML Converter — Live Preview & Clean HTML Output",
  description:
    "Convert Markdown to clean HTML instantly with a live split-pane preview. Supports GFM tables, code blocks, task lists, and more. 100% client-side — nothing leaves your browser.",
  url: "https://markdown-to-html.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "FileCode2",
  brandAccentColor: "#6366f1",

  keywords: [
    "markdown to html",
    "markdown converter",
    "markdown preview",
    "convert markdown to html online",
    "markdown editor",
    "github flavored markdown",
    "gfm converter",
    "markdown live preview",
    "html generator",
    "markdown to html free",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#3b82f6",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/markdown-to-html",
    website: "https://jagodana.com",
  },

  footer: {
    about:
      "Free online Markdown-to-HTML converter with instant live preview. Supports GitHub Flavored Markdown — tables, task lists, code blocks, and more.",
    featuresTitle: "Features",
    features: [
      "Live split-pane preview",
      "GitHub Flavored Markdown",
      "Copy clean HTML output",
      "Download as .html file",
    ],
  },

  hero: {
    badge: "Free Markdown Converter",
    titleLine1: "Convert Markdown to",
    titleGradient: "Clean HTML Instantly",
    subtitle:
      "Paste your Markdown and see the HTML output live — no sign-up, no uploads, no limits. Supports GFM tables, task lists, fenced code blocks, and more.",
  },

  featureCards: [
    {
      icon: "⚡",
      title: "Live Preview",
      description:
        "See rendered output and raw HTML side-by-side as you type — zero delay.",
    },
    {
      icon: "📋",
      title: "GitHub Flavored Markdown",
      description:
        "Full GFM support: tables, task lists, strikethrough, and fenced code blocks.",
    },
    {
      icon: "🔒",
      title: "100% Client-Side",
      description:
        "All processing happens in your browser. Nothing is sent to a server.",
    },
  ],

  relatedTools: [
    {
      name: "HTML to Markdown",
      url: "https://html-to-markdown.tools.jagodana.com",
      icon: "↩️",
      description: "Convert HTML back to clean, readable Markdown.",
    },
    {
      name: "JSON Formatter",
      url: "https://json-formatter.tools.jagodana.com",
      icon: "📐",
      description: "Prettify and validate JSON with syntax highlighting.",
    },
    {
      name: "HTML Minifier",
      url: "https://html-minifier.tools.jagodana.com",
      icon: "🗜️",
      description: "Minify HTML to reduce file size instantly.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.tools.jagodana.com",
      icon: "🧪",
      description: "Build, test and debug regular expressions in real-time.",
    },
    {
      name: "Word Counter",
      url: "https://word-counter.tools.jagodana.com",
      icon: "📝",
      description: "Count words, characters, sentences, and reading time.",
    },
    {
      name: "Text Diff Checker",
      url: "https://text-diff-checker.tools.jagodana.com",
      icon: "🔍",
      description: "Compare two text blocks and highlight differences.",
    },
  ],

  howToSteps: [
    {
      name: "Paste or type Markdown",
      text: "Type or paste your Markdown content into the left editor pane.",
      url: "",
    },
    {
      name: "See the live preview",
      text: "The rendered HTML preview updates instantly as you type on the right pane.",
      url: "",
    },
    {
      name: "Copy or download the HTML",
      text: "Switch to the HTML tab to view the raw output, then copy it or download it as an .html file.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What is a Markdown to HTML converter?",
      answer:
        "A Markdown to HTML converter transforms Markdown syntax (like **bold**, # headings, and - lists) into equivalent HTML tags (<strong>, <h1>, <ul>) that browsers can render. This tool does that conversion instantly in your browser.",
    },
    {
      question: "Does this support GitHub Flavored Markdown (GFM)?",
      answer:
        "Yes. This converter supports full GitHub Flavored Markdown including tables, task lists (- [ ] / - [x]), strikethrough text (~~text~~), fenced code blocks with language hints, and auto-linked URLs.",
    },
    {
      question: "Is my Markdown content sent to a server?",
      answer:
        "No. All conversion happens entirely in your browser using JavaScript. Your content is never uploaded to or stored on any server.",
    },
    {
      question: "Can I download the converted HTML file?",
      answer:
        "Yes. Click the 'Download .html' button to save the output as a standalone .html file that you can open in any browser.",
    },
    {
      question: "What Markdown features are supported?",
      answer:
        "This tool supports headings (H1–H6), bold, italic, strikethrough, inline code, fenced code blocks, blockquotes, ordered and unordered lists, task lists, tables, horizontal rules, images, and links.",
    },
    {
      question: "Why would I need to convert Markdown to HTML?",
      answer:
        "Common use cases include: embedding Markdown content in websites that need raw HTML, copying formatted content into email clients or CMS editors that accept HTML, and previewing how Markdown will render before pasting it elsewhere.",
    },
  ],

  pages: {
    "/": {
      title: "Markdown to HTML Converter — Live Preview & Clean HTML Output",
      description:
        "Convert Markdown to clean HTML instantly with a live split-pane preview. Supports GFM tables, code blocks, task lists, and more. 100% client-side.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
