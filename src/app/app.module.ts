import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './posts/list/list.component';
import { RatingComponent } from './posts/rating/rating.component';
import { HomeComponent } from './layout/home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { CreateComponent } from './posts/create/create.component';

import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { PostsService } from './posts/posts.service';
import { ShowDetailsComponent } from './posts/show-details/show-details.component';
import { RegisterComponent } from './auth/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RatingComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavigationComponent,
    CreateComponent,
    LoginComponent,
    ShowDetailsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'home', component: HomeComponent},
      { path:'posts', component: ListComponent,
        canActivate : [AuthGuard], 
      },
      { path:'create', component: CreateComponent,
      canActivate : [AuthGuard], 
    },
      { path:'login', component: LoginComponent},
      { path:'register', component: RegisterComponent},
      { path:'', redirectTo:'home', pathMatch:'full'},
      { path:'**', component:PageNotFoundComponent }
    ])
  ],
  providers: [PostsService, AuthService, CookieService, AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
