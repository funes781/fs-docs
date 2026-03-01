import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getDocBySlug } from "../../lib/markdown";
import CodeBlock from "./CodeBlock";
import { Center } from "../mdx/center";

interface DocsContentProps {
  activeSlug: string;
}

const DocsContent = ({ activeSlug }: DocsContentProps) => {
  const doc = getDocBySlug(activeSlug);

  if (!doc) {
    return (
      <main className="flex-1 p-10 text-center">
        <h1 className="text-2xl font-bold">Strona nie znaleziona</h1>
        <p className="text-muted-foreground">Wybierz element z menu po lewej.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-10">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{doc.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{doc.description}</p>

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            center: ({ children }) => <Center>{children}</Center>,
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  filename={props.filename || "code"}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </article>

      <div className="mt-16 pt-8 border-t border-border text-xs text-muted-foreground flex justify-between">
        <span>Ostatnia aktualizacja: {new Date().toLocaleDateString()}</span>
      </div>
    </main>
  );
};

export default DocsContent;