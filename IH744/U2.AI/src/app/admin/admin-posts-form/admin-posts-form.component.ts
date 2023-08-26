import {Component, Input, OnInit} from '@angular/core';
import {emptyPost, Post} from "../../core/models/post.model";
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {PostService} from "../../core/services/post.service";


@Component({
  selector: 'app-admin-posts-form',
  templateUrl: './admin-posts-form.component.html'
})


export class AdminPostsFormComponent implements OnInit {

  @Input() post: Post = emptyPost();

  constructor(private router: Router, private postService: PostService) { }


  ngOnInit(): void {
    console.log(this.post);
  }

  async submitForm() {

    if (!this.post.imageUrl) {
      await this.fetchImageUrl();
    }

    this.post.date = format(new Date(), 'd ' + 'MMMM, yyyy', { locale: es });


    if (this.post.id) {
      this.postService.updatePost(this.post);
    } else {
      this.postService.addPost(this.post);
    }

    this.router.navigate(['/admin/posts']);
  }

  async fetchImageUrl() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      this.post.imageUrl = data.message;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
}
