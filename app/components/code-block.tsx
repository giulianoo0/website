import { useState } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

const kanagawaTheme: PrismTheme = {
  plain: {
    color: "#DCD7BA",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#727169",
        fontStyle: "italic",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#98BB6C",
      },
    },
    {
      types: ["keyword", "tag"],
      style: {
        color: "#957FB8",
      },
    },
    {
      types: ["function", "class-name", "title"],
      style: {
        color: "#7E9CD8",
      },
    },
    {
      types: ["number", "constant"],
      style: {
        color: "#D27E99",
      },
    },
    {
      types: ["operator", "entity", "url", "variable", "property"],
      style: {
        color: "#DCD7BA",
      },
    },
    {
      types: ["builtin", "important"],
      style: {
        color: "#FF5D62",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#9CABCA",
      },
    },
    {
      types: ["regex"],
      style: {
        color: "#C0A36E",
      },
    },
  ],
};

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

  const code = children.trim();

  return (
    <div className="codeblock" style={{ background: "var(--kanagawa-sumi-2)" }}>
      <div
        className="codeblock-header"
        style={{
          borderBottom: "none",
          background: "transparent",
        }}
      >
        <span className="codeblock-label" style={{ color: "#7FB4CA" }}>
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="codeblock-copy"
          style={{
            background: copied ? "rgba(127, 180, 202, 0.3)" : "rgba(34, 50, 73, 0.5)",
            color: "#DCD7BA",
            transform: copied ? "scale(1.05)" : "scale(1)",
            transition: "all 200ms ease",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Highlight theme={kanagawaTheme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} codeblock-pre`}
            style={{
              ...style,
              padding: "8px 16px 16px",
              margin: 0,
            }}
          >
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} style={{ padding: 0, margin: 0 }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
