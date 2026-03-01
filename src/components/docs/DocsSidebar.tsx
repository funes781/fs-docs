import { useState, useMemo } from "react";
import { ChevronRight, BookOpen, Rocket} from "lucide-react";
import { cn } from "../../lib/utils";
import { getAllDocs } from "../../lib/markdown";

interface DocsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeItem: string;
    setActiveItem: (slug: string) => void;
}

const DocsSidebar = ({ isOpen, onClose, activeItem, setActiveItem }: DocsSidebarProps) => {
    const [openSections, setOpenSections] = useState<string[]>(["Getting Started"]);

    const sections = useMemo(() => {
        const docs = getAllDocs();
        const grouped: Record<string, { label: string; slug: string }[]> = {};

        docs.forEach((doc) => {
            const cat = doc.category || "root";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({ label: doc.title, slug: doc.slug });
        });

        return Object.entries(grouped)
            .map(([category, items]) => ({
                title: category,
                items: items,
                icon: <BookOpen className="w-4 h-4" />
            }))
            .sort((a, b) => {
                if (a.title === "root") return -1;
                if (b.title === "root") return 1;
                return a.title.localeCompare(b.title);
            });
    }, []);

    const toggleSection = (title: string) => {
        setOpenSections((prev) =>
            prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
        );
    };

    return (
        <>
            {/* OVERLAY MOBILE */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside className={cn(
                "bg-background border-r border-border overflow-y-auto transition-transform duration-300 ease-in-out z-[70]",
                "fixed inset-y-0 left-0 w-72",
                isOpen ? "translate-x-0" : "-translate-x-full",
                "lg:static lg:translate-x-0 lg:w-64 lg:h-[calc(100vh-3.5rem)] lg:top-14 lg:sticky lg:block lg:py-6 lg:px-3"
            )}>
                <nav className="space-y-1 p-4 lg:p-0">
                    {sections.map((section, i) => {
                        const isRoot = section.title === "root";
                        const isSectionOpen = openSections.includes(section.title);

                        return (
                            <div key={section.title} className="animate-fade-in-left" style={{ animationDelay: `${i * 40}ms` }}>
                                {!isRoot ? (
                                    <>
                                        <button
                                            onClick={() => toggleSection(section.title)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                                        >
                                            <span className="text-primary/70 group-hover:text-primary transition-colors">
                                                {section.icon}
                                            </span>
                                            <span className="flex-1 text-left uppercase tracking-wider text-[11px]">
                                                {section.title}
                                            </span>
                                            <ChevronRight className={cn(
                                                "w-3.5 h-3.5 transition-transform duration-200",
                                                isSectionOpen && "rotate-90"
                                            )} />
                                        </button>

                                        {/* ELEMENTY WROZWIJANEJ SEKCJI */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-300 ease-out ml-4 border-l border-border",
                                            isSectionOpen ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"
                                        )}>
                                            <div className="pl-3 space-y-0.5 py-1">
                                                {section.items.map((item) => (
                                                    <button
                                                        key={item.slug}
                                                        onClick={() => {
                                                            setActiveItem(item.slug);
                                                            if (window.innerWidth < 1024) onClose();
                                                        }}
                                                        className={cn(
                                                            "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                                                            activeItem === item.slug
                                                                ? "text-primary bg-primary/10 font-medium"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                                        )}
                                                    >
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* RENDEROWANIE PLIKÓW Z ROOT (BEZ NAGŁÓWKA) */
                                    <div className="space-y-0.5">
                                        {section.items.map((item) => (
                                            <button
                                                key={item.slug}
                                                onClick={() => {
                                                    setActiveItem(item.slug);
                                                    if (window.innerWidth < 1024) onClose();
                                                }}
                                                className={cn(
                                                    "flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200",
                                                    activeItem === item.slug
                                                        ? "text-primary bg-primary/10 font-medium"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                                )}
                                            >
                                                <Rocket className={cn("w-4 h-4", activeItem === item.slug ? "text-primary" : "text-primary/40")} />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default DocsSidebar;
