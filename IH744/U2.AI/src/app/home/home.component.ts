import {Component, OnInit} from '@angular/core';
import {Post} from "../core/models/post.model";
import {PostService} from "../core/services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }
}
