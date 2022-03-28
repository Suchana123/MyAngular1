import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup ;
  loading = false;
  submitted = false;
   constructor( 
    private formBuilder: FormBuilder,
  //   private router: Router,
  //   //private authenticationService: AuthenticationService,
  //   //private userService: UserService,
  //   //private alertService: AlertService) {
  //     if (this.authenticationService.currentUserValue) {
  //       this.router.navigate(['/']);
  //   }
  //    }
   ){this.registerForm = this.formBuilder.group({})}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("hello");
  }

}
