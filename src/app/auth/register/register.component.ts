import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : any = {}
  constructor(private _authService : AuthService) { }

  ngOnInit() {
  }
  save(){
    console.log(this.user);
    this._authService.register(this.user);
  }
}
