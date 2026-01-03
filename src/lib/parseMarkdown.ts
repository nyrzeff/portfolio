import { type GrayMatterFile, default as matter } from "gray-matter";
import type { Frontmatter, MarkdownFile } from "@/types/markdown";

export const parseMarkdown = (raw: string): MarkdownFile => {
    const { data, content } = matter(raw);
    const frontmatter = data as Frontmatter;

    return {
        frontmatter,
        content,
    };
};

// all .md files are inside the same directory anyway,
// so no problem in setting a static path
export const parseMarkdownFromDir = async (): Promise<MarkdownFile[]> => {
    const modules = import.meta.glob("/src/content/projects/*.md", {
        query: "?raw",
        import: "default",
    });

    const projects = await Promise.all(
        Object.entries(modules).map(async ([, loader]) => {
            const raw = (await loader()) as GrayMatterFile<string>;
            const { data, content } = matter(raw);
            const frontmatter = data as Frontmatter;

            return {
                frontmatter,
                content,
            };
        }),
    );

    return projects;
};
