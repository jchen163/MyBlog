import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  toogleLink:boolean = true;
  constructor(private _authService:AuthService, private _router:Router) {
    this._router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        if(_authService.checkLogin())
        this.toogleLink = false;
        else
        this.toogleLink = true;
      }
    })
   }
    
  ngOnInit() {
  
  }

  logout(){
   this._authService.logout();
   this._router.navigate(['/home']);
  }
}
