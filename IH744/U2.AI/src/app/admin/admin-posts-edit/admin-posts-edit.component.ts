import {Component, OnInit} from '@angular/core';
import {Post} from "../../core/models/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../core/services/post.service";

@Component({
  selector: 'app-admin-posts-edit',
  templateUrl: './admin-posts-edit.component.html'
})
export class AdminPostsEditComponent implements OnInit {
  post: Post | null = null;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id')!;
    const id = Number(idStr);
    this.post = this.postService.getPost(id);
  }
}
