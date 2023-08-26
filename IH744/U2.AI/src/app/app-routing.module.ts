import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {AdminPostsComponent} from "./admin/admin-posts/admin-posts.component";
import {AdminPostsEditComponent} from "./admin/admin-posts-edit/admin-posts-edit.component";
import {AdminPostsNewComponent} from "./admin/admin-posts-new/admin-posts-new.component";
import {NoReuseStrategy} from "./core/strategies/no-reuse-strategy";
import {ScreencastComponent} from "./pages/screencast/screencast.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'screencast', component: ScreencastComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'admin/posts', component: AdminPostsComponent },
  { path: 'admin/posts/:id/edit', component: AdminPostsEditComponent },
  { path: 'admin/posts/new', component: AdminPostsNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: NoReuseStrategy }
  ],
})
export class AppRoutingModule { }
