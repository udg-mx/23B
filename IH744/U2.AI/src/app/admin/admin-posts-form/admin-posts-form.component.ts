import {Component, Input, NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {emptyPost, Post} from "../../core/models/post.model";


@Component({
  selector: 'app-admin-posts-form',
  templateUrl: './admin-posts-form.component.html'
})

@NgModule({
  imports: [
    // ... otros imports ...
    FormsModule
  ],
  // ... otros metadatos ...
})

export class AdminPostsFormComponent implements OnInit {

  @Input() post: Post = emptyPost();

  constructor() { }

  ngOnInit(): void {
  }
}
