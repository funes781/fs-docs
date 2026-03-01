import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = "typescript", filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-code-border bg-code-bg overflow-hidden my-4 group">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-code-border bg-muted/30">
          <span className="text-xs text-muted-foreground font-mono">{filename}</span>
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-mono">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono text-secondary-foreground">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 p-1.5 rounded-md transition-all duration-200",
            "opacity-0 group-hover:opacity-100",
            "bg-secondary hover:bg-border text-muted-foreground hover:text-foreground"
          )}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
