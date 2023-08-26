import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {AdminPostsComponent} from "./admin/admin-posts/admin-posts.component";
import {AdminPostsEditComponent} from "./admin/admin-posts-edit/admin-posts-edit.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'admin/posts', component: AdminPostsComponent },
  { path: 'admin/posts/:id/edit', component: AdminPostsEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
