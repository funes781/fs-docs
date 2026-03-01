import matter from "gray-matter";

// Vite glob pattern
const modules = import.meta.glob("/content/**/*.{md,mdx}", { as: "raw", eager: true });

export interface DocPage {
    slug: string;
    title: string;
    description: string;
    category: string;
    content: string;
}

export const getAllDocs = (): DocPage[] => {
    return Object.keys(modules).map((path) => {
        const rawContent = modules[path] as string;
        const { data, content } = matter(rawContent);

        const segments = path.split("/");
        const fileName = segments[segments.length - 1];
        const folderName = segments[segments.length - 2];

        const category = folderName === "content" ? "root" : folderName;
        const slug = fileName.replace(/\.(md|mdx)$/, "");

        return {
            slug,
            title: data.title || slug,
            description: data.description || "",
            category,
            content,
        };
    });
};

export const getDocBySlug = (slug: string) => {
    const docs = getAllDocs();
    return docs.find((doc) => doc.slug === slug);
};