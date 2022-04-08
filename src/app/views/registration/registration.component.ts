import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { Router } from '@angular/router';
import { MustMatch } from '../../shared/must-match-validator';

import {UserService} from '../../services/user.service';
 //import {  AuthenticationService } from '../_services/authentication.service';
 import {AlertService} from '../../services/alert.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup ;
  loading = false;
  submitted = false;
  disabled = false;
   constructor( 
    private formBuilder: FormBuilder,
     private router: Router,
  //   //private authenticationService: AuthenticationService,
     private userService: UserService,
     private alertService: AlertService 
  //     if (this.authenticationService.currentUserValue) {
  //       this.router.navigate(['/']);
  //   }
  //    }
   ){this.registerForm = this.formBuilder.group({}),
    this.disabled=true}

  ngOnInit(): void {
      //console.log(this.alertService);
      //this.alertService.success('Registration successful', true);
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['',  Validators.required],
        disclaimer: [false]
      
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });

   
    
  }

  ngDoCheck(): void{
    if( this.registerForm.controls['disclaimer'].value === true){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    //this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
  }

  this.loading = true;
  this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              console.log(data);
              this.router.navigate(['/login']);
          },
          error => {
            //this.alertService.error(error);
            console.log(error);
              this.loading = false;
          });
}

}
