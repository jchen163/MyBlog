import { Component, OnInit,Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-show-details',
  templateUrl: 'show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
   @Input() post;
  comment:string;
  constructor(private _http : HttpClient,private _postService : PostsService,private _authService : AuthService) { }

  ngOnInit() {
  }
 

  like(){
    this._postService.like(this.post);
  }
  sent(){
    console.log(this.comment);
    this._postService.sentComment(this.post,this.comment);
  }
}
