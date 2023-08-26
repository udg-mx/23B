import {Component, OnInit} from '@angular/core';
import {Post} from "../../core/models/post.model";
import {PostService} from "../../core/services/post.service";
import {faRefresh, faPlus, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html'
})
export class AdminPostsComponent implements OnInit {
  posts: Post[] = [];
  faRefresh = faRefresh;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }
}
