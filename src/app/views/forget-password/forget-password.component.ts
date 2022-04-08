import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { User } from 'src/app/models/user';

 import {  UserAuthService } from '../../services/user-auth.service';
 import {AlertService} from '../../services/alert.service'
 import { MustMatch } from '../../shared/must-match-validator';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  loginForm!: FormGroup;
  resetPassform!: FormGroup
  loading = false;
  submitted = false;
  returnUrl!: string;
  isUsername : boolean;
  public userDetail: User;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
     private authenticationService: UserAuthService,
     private alertService: AlertService,
     private userService: UserService,
    ) { 
    //   if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }
    this.isUsername = false;
    this.userDetail = {} as User;
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
    });
    this.resetPassform = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword : ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
    }
  
    get f() { return this.loginForm.controls; }
    get f1() { return this.resetPassform.controls; }
  
    onSubmit() {
      this.submitted = true;
  
      this.alertService.clear();
  
      this.userService.getUsersDetailsByEmail(this.f.username.value).pipe(map((user: any)=>{
        return user[0];
      })).subscribe((res: any)=>{
        this.userDetail = res;
        console.log(this.userDetail);
        if(this.userDetail){
          console.log("hello");
          this.isUsername = true;
         }
         else{
           this.isUsername = false;
         }
      })
    }

    onSubmit2() {
      this.userService.updateUser
      (
        this.userDetail.id, {"password": this.f1['password'].value, "confirmPassword": this.f1['confirmPassword'].value}
      )
      .subscribe((res: any)=>{
        console.log(res);
        this.router.navigate(['/login']);  
      })
    }

}
