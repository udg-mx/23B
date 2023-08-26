import { Injectable } from '@angular/core';
import defaultPosts from './data.json';
import { Post } from '../models/post.model';

const STORAGE_KEY = 'posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
    this.initializeStorageIfEmpty();
  }

  private storePosts(posts: Post[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  getPosts(): Post[] {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      return JSON.parse(storedPosts) as Post[];
    }
    return [];
  }

  addPost(newPost: Post): void {
    const posts = this.getPosts();
    const highestId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;
    newPost.id = highestId + 1;
    posts.push(newPost);
    this.storePosts(posts);
  }

  getPost(id: number): Post | null {
    const posts = this.getPosts();
    return posts.find(post => post.id === id) || null;
  }

  deletePost(id: number): void {
    const posts = this.getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    this.storePosts(updatedPosts);
  }

  updatePost(updatedPost: Post): void {
    const posts = this.getPosts();
    const postIndex = posts.findIndex(post => post.id === updatedPost.id);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      this.storePosts(posts);
    }
  }

  private initializeStorageIfEmpty(force = false): void
  {

    if (!localStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) === '[]' || force)
    {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts as Post[]));
    }

  }

  resetPosts(): void {
    this.initializeStorageIfEmpty(true);
  }


}
