import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AdminPostsEditComponent } from './admin/admin-posts-edit/admin-posts-edit.component';
import { AdminPostsNewComponent } from './admin/admin-posts-new/admin-posts-new.component';
import { AdminPostsFormComponent } from './admin/admin-posts-form/admin-posts-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PostDetailComponent,
    AdminPostsComponent,
    AdminPostsEditComponent,
    AdminPostsNewComponent,
    AdminPostsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
