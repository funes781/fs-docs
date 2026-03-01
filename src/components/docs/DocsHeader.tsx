import { Search, Menu } from "lucide-react";
import { useState } from "react";

interface DocsHeaderProps {
    onMenuClick: () => void;
}

const DocsHeader = ({ onMenuClick }: DocsHeaderProps) => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="h-14 border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
            <div className="relative grid grid-cols-3 items-center h-full px-4 md:px-6">

                {!isSearchOpen ? (
                    <>
                        <div className="flex items-center">
                            <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 hover:bg-secondary rounded-md transition-colors">
                                <Menu className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="flex justify-center items-center">
                            <span className="font-bold text-foreground tracking-tight whitespace-nowrap">
                                FS-DOCS
                            </span>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className={`relative hidden md:block transition-all duration-300 ${searchFocused ? "w-64" : "w-40"}`}>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="w-full h-9 pl-9 pr-4 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20"
                                />
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="md:hidden p-2 text-muted-foreground hover:bg-secondary rounded-md transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-background flex items-center px-4 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search documentation..."
                                className="w-full h-10 pl-10 pr-4 bg-secondary border border-primary/20 rounded-lg focus:outline-none text-base"
                            />
                        </div>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="ml-3 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DocsHeader;
