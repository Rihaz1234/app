import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "@services/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  roles;
  isDisable = false;
  
  constructor(
    private authService : AuthenticationService,
    public router : Router) { }
    
  ngOnInit(){
    this.roles = this.authService.getRoles();    
    if (this.roles.indexOf("CFA") > -1) {
      this.isDisable = true;      
    }
  }

  getRole(role) {
    return this.authService.getRoles().indexOf(role) > -1;
  }

  getRoleToDisplay() {
    return this.authService.getRoles();
  }
}
