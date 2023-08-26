import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../core/services/post.service';
import { Post } from '../core/models/post.model';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id')!;
    const id = Number(idStr);
    this.post = this.postService.getPost(id);
  }
}
