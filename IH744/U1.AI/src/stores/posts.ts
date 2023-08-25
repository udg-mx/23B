import defaultPosts from '@/assets/data.json';
import type {Post} from "@/models/Post";

const STORAGE_KEY = 'posts';
function storePosts(posts: Post[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getPosts(): Post[] {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
        return JSON.parse(storedPosts);
    }
    return [];
}

function putPost(newPost: Post): void {
    const posts = getPosts();
    const highestId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;
    newPost.id = highestId + 1;
    posts.push(newPost);
    storePosts(posts);
}

function pullPost(id: number): Post | null {
    const posts = getPosts();
    return posts.find(post => post.id === id) || null;
}


function deletePost(id: number): void {

    const posts = getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    storePosts(updatedPosts);

}

function pushPost(updatedPost: Post): void {
    const posts = getPosts();
    const postIndex = posts.findIndex(post => post.id === updatedPost.id);
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        storePosts(posts);
    }
}

function initializeStorageIfEmpty(force = false): void
{
    if (!localStorage.getItem(STORAGE_KEY) || force) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }

}
function resetPosts(): void
{
    initializeStorageIfEmpty(true);
}
initializeStorageIfEmpty();


export { getPosts, putPost, pullPost, pushPost, resetPosts, deletePost };