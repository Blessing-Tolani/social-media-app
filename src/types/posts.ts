export interface Post {
    id?: number;
    body: string;
    title: string;
    userId: string;
    tags: string[];
    reaction: string;
}