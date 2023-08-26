import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
  isModalOpen = false;
  currentContext: string | number = '';
  currentTitle: string = '';
  currentMessage: string = '';
  currentAction: (() => void) | undefined;

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  openDeletePostModal(postId: number): void {
    this.currentTitle = 'Eliminar Post';
    this.currentMessage = '¿Deseas eliminar este post?';
    this.currentContext = postId;
    this.currentAction = () => {
      this.postService.deletePost(this.currentContext as number)
      this.posts = this.postService.getPosts()
      this.isModalOpen = false;

    };
    this.isModalOpen = true;

  }

  openResetDBModal(): void {
    this.currentTitle = 'Restablecer Base de Datos';
    this.currentMessage = '¿Estás seguro de que quieres restablecer la base de datos?';
    this.currentAction = () => {
      this.postService.resetPosts();
      this.posts = this.postService.getPosts()
      this.isModalOpen = false;
    };
    this.isModalOpen = true;

  }

  handleModalConfirm(): void {
    if (this.currentAction === undefined) return;
    this.currentAction();
  }

  handleModalCancel(): void {
    this.isModalOpen = false;
  }
}
