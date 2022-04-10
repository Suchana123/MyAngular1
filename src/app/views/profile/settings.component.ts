import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public currentUser: User;
  constructor(
    private authenticationService: UserAuthService,
   
  ) { 
    this.currentUser = {} as User;
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);

    console.log(this.currentUser);
    
    
  }

}
