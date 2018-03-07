import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  post :any = {};

  constructor(private _postService : PostsService, private _router :Router) { }

  ngOnInit() {
  }

  createPost() {
    console.log(this.post)
    this._postService.createPost(this.post);
    this._router.navigate(['/posts']);
  }

}
