export interface Frontmatter {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    stack: string[];
    colors: string[];
}

export interface MarkdownFile {
    frontmatter: Frontmatter;
    content: string;
}
