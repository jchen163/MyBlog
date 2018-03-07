import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PostsService {
  // post : Post[];
  
  newProductSubject =  new Subject<Post[]>();
  post =  new Subject<Post>();

  constructor(private _http : HttpClient, private _authService : AuthService) { }


  getPosts(): Subject<Post[]> {
    this._http.get('http://localhost:2000/getposts', {
      headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
    }) .subscribe((res: Post[]) => {
      this.newProductSubject.next(res);
  });
  
  return this.newProductSubject;
}

getPost(code:string):Subject<Post>{
  var obj = {
    code:code
  };
    this._http.post('http://localhost:2000/getpost', obj,{
    headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
  }).subscribe((data:Post) => {   
    this.post.next(data) ;
  
 });
//  console.log('in service '+this.product)
 return this.post;
}



  createPost(p:Post)  {
    const obj = {
      from:this._authService.cur_user(),
      title:p.title,
      description:p.description,
      like:[],
      comments:[]
    }
    // p.from = this._authService.cur_user();
 
    return this._http.post('http://localhost:2000/addpost', obj,{
      headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
    })
    .subscribe(() => {    
      this.getPosts(); 
    });
  }
  
  // editProducts(product:Post)  {
  //   return this._http.post('http://localhost:2000/editproduct', product,{
  //     headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
  //   })
  //   .subscribe(() => {    
  //     this.getProducts(); 
  //   });
  // } 
  like(p:Post){

    if(p.like==undefined)
    p.like = [this._authService.cur_user()];
    else
    p.like.push(this._authService.cur_user());
  
    this._http.post('http://localhost:2000/addlike', p,{
     headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
   })  .subscribe(() => {    
    this.getPosts(); 
  });
  }
  // totalLike(p:Post){
    
  //   this._http.post('http://localhost:2000/totallike', p,{
  //     headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
  //   });
  // }
  sentComment(p:Post,comment:string){
      p.comments.push(comment);
      console.log(p);
      this._http.post('http://localhost:2000/comment', p,{
      headers: new HttpHeaders().set('authorization', this._authService.fetchToken())
    }) .subscribe(() => {    
      this.getPosts(); 
    });
  }
  }


