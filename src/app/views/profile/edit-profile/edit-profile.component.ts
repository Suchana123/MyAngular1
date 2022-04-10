import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
//import { IUserFormData } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
//import { Alarm, App, Bookmark } from 'ng-bootstrap-icons/icons';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public userForm: FormGroup;
   //public userDetails: User;
   public currentUser: User;
  public updatedDetails: any;
  public disabled: boolean;
  public edit: boolean;
  public btnText : string;
  constructor(
    private formBuilder: FormBuilder,
     private userService: UserService,
     private authenticationService: UserAuthService,
    
  ) {
    this.userForm = {} as FormGroup;
     this.currentUser = {} as User;
    // this.userDetails = {} as IUserFormData
    this.disabled = true;
    this.edit = false;
    this.btnText = "Edit";
   }

  ngOnInit(): void {
     this.authenticationService.currentUser.subscribe(user => this.currentUser = user);

     this.initializeUserForm();
   
  }
  

  public initializeUserForm():void{
   
    this.userForm =  this.formBuilder.group({
      firstname:[this.currentUser.firstName,[Validators.required]],
      lastname:[this.currentUser.lastName,[Validators.required]],
      username:[this.currentUser.username,[Validators.required,Validators.email]], 
      password:["",[Validators.required, Validators.minLength(6)] ],
    })
    
  }

  ngDoCheck(): void{
    
    if(this.userForm.status ==="VALID"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    
    
  }

  public toggleEdit(): void{
   
    this.edit = !this.edit;
    if (this.edit==true) {
      this.btnText = "Update";
    }
    else {
      this.btnText = "Edit";
    }
  }
  get userFormControls(){
    return this.userForm.controls;
  }
  public onSubmit():void{
    this.updatedDetails = this.userForm.getRawValue();
    this.updatedDetails['cpassword'] = this.updatedDetails['password'];
    this.userService.updateUser(this.currentUser.id, this.updatedDetails).subscribe((res:any)=>{
     localStorage.setItem('currentUser', JSON.stringify({
       id:res.id,
       firstName: res.firstName,
       lastName: res.lastName,
       username: res.username,
       address: res.address? res.address:[],
       payment: res.payment? res.payment: []
     }))

    
    this.authenticationService.currentUserUpdate = {
      id:res.id,
      firstName: res.firstName,
      lastName: res.lastName,
      username: res.username,
      address: res.address? res.address:[]
      //payment: res.payment? res.payment: []
    }
      
    })
    this.userService.getUsersDetails().subscribe((res: User[])=>{
      localStorage.setItem("users", JSON.stringify(res))
    })
    this.toggleEdit();
  }

}
