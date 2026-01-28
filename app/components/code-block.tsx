import { useState } from "react";

type CodeBlockProps = {
  language?: string;
  children: string;
};

export function CodeBlock({ language = "code", children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="codeblock">
      <div className="codeblock-header">
        <span className="codeblock-label">{language}</span>
        <button type="button" onClick={handleCopy} className="codeblock-copy">
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <pre className="codeblock-pre">
        <code>{children}</code>
      </pre>
    </div>
  );
}
