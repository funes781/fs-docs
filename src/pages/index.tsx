import { useState } from "react";

import DocsHeader from "../components/docs/DocsHeader";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsContent from "../components/docs/DocsContent";
import DocsTableOfContents from "../components/docs/DocsTOC";

const Index = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSlug, setActiveSlug] = useState("introduction");

    return (
        <div className="min-h-screen bg-background">
            {/* <DocsHeader /> */}
            <DocsHeader onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex">
                {/* <DocsSidebar /> */}
                <DocsSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    activeItem={activeSlug}
                    setActiveItem={setActiveSlug}
                />
                <DocsContent activeSlug={activeSlug} />
                <DocsTableOfContents />
            </div>
        </div>
    );
};

export default Index;
