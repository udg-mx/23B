import { Injectable } from '@angular/core';
import defaultPosts from './data.json';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getPosts(): Post[] {

    const posts: Post[] = [];

    for (const post of defaultPosts) {
      posts.push(post as Post);
    }

    return posts;
  }

  getPost(id: number): Post | null {
    const posts = this.getPosts();
    return posts.find(post => post.id === id) || null;
  }
}
