import defaultPosts from './data.json';
import type {Post} from "./post";
import {emptyPost} from "./post";

function getPosts(): Post[] {
    return defaultPosts as Post[];
}

function getPost(id: number): Post {
    return getPosts().find(post => post.id === id) || emptyPost();
}

export { getPosts, getPost };