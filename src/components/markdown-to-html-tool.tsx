"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { marked } from "marked";
import { Copy, Download, RotateCcw, Eye, Code2, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToolEvents } from "@/lib/analytics";

marked.use({
  gfm: true,
  breaks: false,
});

const SAMPLE_MARKDOWN = `# Hello, Markdown! 🎉

Welcome to the **Markdown to HTML Converter**. Edit this pane to see live HTML output.

## Features

- ✅ Live preview as you type
- ✅ GitHub Flavored Markdown support
- ✅ Copy clean HTML with one click
- ✅ Download as **.html** file
- ✅ 100% client-side — nothing leaves your browser

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

## Table

| Feature       | Supported |
|---------------|-----------|
| Tables        | ✅        |
| Task lists    | ✅        |
| Code blocks   | ✅        |
| Strikethrough | ✅        |

## Task List

- [x] Write Markdown
- [x] See HTML output
- [ ] Copy or download

> **Tip:** Paste any Markdown document here — README files, docs, blog posts, notes, and more.
`;

function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  const scripts = div.querySelectorAll("script");
  scripts.forEach((s) => s.remove());
  const elements = div.querySelectorAll("*");
  elements.forEach((el) => {
    const attrs = Array.from(el.attributes);
    attrs.forEach((attr) => {
      if (attr.name.startsWith("on")) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return div.innerHTML;
}

type ActiveTab = "preview" | "html";

export function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    try {
      const raw = marked.parse(markdown) as string;
      return sanitizeHtml(raw);
    } catch {
      return "<p>Error parsing Markdown.</p>";
    }
  }, [markdown]);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = html;
    }
  }, [html]);

  const copyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success("HTML copied to clipboard!");
      ToolEvents.resultCopied();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please select and copy manually.");
    }
  }, [html]);

  const downloadHtml = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Converted from Markdown</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #24292e; }
    pre { background: #f6f8fa; border-radius: 6px; padding: 16px; overflow-x: auto; }
    code { background: #f6f8fa; padding: 2px 6px; border-radius: 4px; font-family: 'SF Mono', monospace; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e1e4e8; padding: 8px 12px; }
    th { background: #f6f8fa; }
    blockquote { border-left: 4px solid #e1e4e8; margin: 0; padding: 0 16px; color: #6a737d; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded as converted.html");
    ToolEvents.resultExported("html");
  }, [html]);

  const resetToSample = useCallback(() => {
    setMarkdown(SAMPLE_MARKDOWN);
    toast.success("Reset to sample content");
    ToolEvents.toolUsed("reset");
  }, []);

  const wordCount = useMemo(() => {
    return markdown.trim().split(/\s+/).filter(Boolean).length;
  }, [markdown]);

  const lineCount = useMemo(() => {
    return markdown.split("\n").length;
  }, [markdown]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          <span>·</span>
          <span>{lineCount} lines</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToSample}
            className="gap-1.5 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyHtml}
            className="gap-1.5 text-xs"
          >
            {copied ? (
              <CheckCheck className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied!" : "Copy HTML"}
          </Button>
          <Button
            size="sm"
            onClick={downloadHtml}
            className="gap-1.5 text-xs bg-gradient-to-r from-brand to-brand-accent text-white shadow-sm shadow-brand/25"
          >
            <Download className="h-3.5 w-3.5" />
            Download .html
          </Button>
        </div>
      </div>

      {/* Split Pane */}
      <div className="grid md:grid-cols-2 gap-0 rounded-2xl border border-border/60 overflow-hidden shadow-sm">
        {/* Left: Markdown Editor */}
        <div className="flex flex-col min-h-[520px] border-r border-border/60">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-b border-border/60">
            <Code2 className="h-4 w-4 text-brand" />
            <span className="text-sm font-medium">Markdown</span>
          </div>
          <textarea
            className="flex-1 resize-none p-4 bg-background font-mono text-sm leading-relaxed outline-none placeholder:text-muted-foreground/50"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type or paste your Markdown here..."
            spellCheck={false}
            aria-label="Markdown input"
          />
        </div>

        {/* Right: Output */}
        <div className="flex flex-col min-h-[520px]">
          {/* Tab bar */}
          <div className="flex items-center bg-muted/40 border-b border-border/60">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "preview"
                  ? "text-brand border-b-2 border-brand bg-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-selected={activeTab === "preview"}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("html")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "html"
                  ? "text-brand border-b-2 border-brand bg-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-selected={activeTab === "html"}
            >
              <Code2 className="h-4 w-4" />
              HTML
            </button>
          </div>

          {/* Preview tab */}
          <div
            className={`flex-1 overflow-auto p-5 ${activeTab === "preview" ? "block" : "hidden"}`}
          >
            <div
              ref={previewRef}
              className="prose prose-sm dark:prose-invert max-w-none"
              aria-label="Rendered preview"
            />
          </div>

          {/* HTML tab */}
          <div
            className={`flex-1 overflow-auto ${activeTab === "html" ? "block" : "hidden"}`}
          >
            <pre className="h-full p-4 text-xs leading-relaxed font-mono text-foreground/80 bg-muted/20 overflow-auto whitespace-pre-wrap break-words">
              {html}
            </pre>
          </div>
        </div>
      </div>

      {/* Tip */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Supports GFM: tables, task lists, fenced code blocks, strikethrough, and auto-links.
        Your content never leaves the browser.
      </p>
    </div>
  );
}
