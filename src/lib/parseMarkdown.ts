import type { Frontmatter, Project } from "@/types/markdown";

const parseFrontmatter = (raw: string): Frontmatter => {
    type StringKey =
        | "id"
        | "title"
        | "subtitle"
        | "repo"
        | "startDate"
        | "endDate";
    type ArrayKey = "tags" | "stack" | "colors";

    const frontmatter: Frontmatter = {
        id: "",
        title: "",
        subtitle: "",
        repo: "",
        startDate: "",
        endDate: "",
        stack: [],
        colors: [],
        tags: [],
    };

    const chunks = raw.split("\n");

    let arrayPropertyKey;
    let arrayPropertyValue = [];

    for (const chunk of chunks) {
        if (chunk.includes(":") && chunk.includes('"')) {
            const propertyKey = chunk.split(":")[0].trim() as StringKey;
            const propertyValue = chunk
                .substring(chunk.indexOf(":") + 1)
                .trim()
                .slice(1, -1) as string;
            frontmatter[propertyKey] = propertyValue;
        } else {
            if (chunk.charAt(chunk.length - 1) === ":") {
                arrayPropertyValue = [];
                arrayPropertyKey = chunk.slice(0, -1) as ArrayKey;
                frontmatter[arrayPropertyKey] = [];
            }

            if (chunk.includes("-") && arrayPropertyKey !== undefined) {
                let value = chunk.trim().substring(2);
                if (value.includes('"')) value = value.slice(1, -1);
                arrayPropertyValue.push(value);
                frontmatter[arrayPropertyKey] = arrayPropertyValue;
            }
        }
    }
    return frontmatter;
};

// all .md files are inside the same directory anyway,
// so no problem in setting a static path
export const parseMarkdownFromDir = async (): Promise<Project[]> => {
    const modules = import.meta.glob("/src/content/projects/*.md", {
        query: "?raw",
        import: "default",
    });

    const projects = await Promise.all(
        Object.entries(modules).map(async ([, loader]) => {
            const raw = (await loader()) as string;

            const chunks = raw.split("---").slice(1);
            const rawFrontmatter: string = chunks[0].trim();
            const frontmatter: Frontmatter = parseFrontmatter(rawFrontmatter);
            const content: string = chunks[1].trim();

            return {
                frontmatter,
                content,
            };
        }),
    );

    return projects;
};
