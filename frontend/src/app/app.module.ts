import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import { HttpModule, JsonpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Include Components
import { AlertComponent } from './components/alert/alert.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { StudyComponent } from './components/share/share.component';

// Include Services
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AlertService } from './services/alert.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { FavoriteService } from './services/favorite.service';

// Include Angular2 Bootstrap4 Modal
import {ModalModule} from "ngx-bootstrap";

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  { path: 'home',
    component: HomeComponent,
  },
  {
    path: 'recommend',
    component : RecommendComponent,
  },
  { path: 'share',
    component: StudyComponent,
  },
  {
    path: 'favorite',
    component : FavoriteComponent,
    canActivate: [AuthGuard]
  },
  { path: '**',
    component: HomeComponent,
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    StudyComponent,
    FavoriteComponent,
    RecommendComponent,
  ],
  // entryComponents: [ModalComponent],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [ UserService, AuthService, AuthGuard, AlertService, PostService, CommentService,
                FavoriteService,
  ],
  bootstrap: [ AppComponent, ]
})
export class AppModule {


}
