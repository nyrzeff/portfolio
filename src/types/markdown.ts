export interface Frontmatter {
    id: string;
    title: string;
    subtitle: string;
    repo?: string;
    startDate: string;
    endDate: string;
    stack: string[];
    colors?: string[];
    tags?: string[];
}

export interface Project {
    frontmatter: Frontmatter;
    content?: string;
}
