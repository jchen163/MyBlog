import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pageTitle : string = "Product list";
  imgWidth: number = 50;
  posts: Post[];

  constructor(private _postService : PostsService,) { }
   show:Post;
  ngOnInit() {
    this._postService.getPosts().subscribe((data:Post[]) => {
      this.posts = data;
    });
    this._postService.newProductSubject.subscribe((data:Post[]) => {
      this.posts = data;
    });
  }

  comment(post:Post){
   
    if(this.show == post)
    this.show = null;
    else
    this.show = post;
  }
  // acceptRatingFromChild(msg:string) {
  //   alert('From parent = '+msg);
  // }

}
