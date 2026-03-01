const tocItems = [
    { label: "Szybki start", id: "quick-start" },
    { label: "Konfiguracja", id: "configuration" },
    { label: "Następne kroki", id: "next-steps" },
];

const DocsTableOfContents = () => {
    return (
        <aside className="w-52 shrink-0 hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] py-10 pr-4">
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Na tej stronie
                </h4>
                <nav className="space-y-1">
                    {tocItems.map((item, i) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block text-sm text-muted-foreground hover:text-foreground py-1 border-l-2 border-transparent hover:border-primary pl-3 transition-all duration-200"
                            style={{ animationDelay: `${200 + i * 50}ms` }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default DocsTableOfContents;
