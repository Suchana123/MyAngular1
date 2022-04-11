import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  public userForm: FormGroup;
  public userDetails: User;
  public currentUser: User;
  public updatedDetails: any;
  public disabled: boolean;
  public edit: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private formService: UserService,
    private authenticationService: UserAuthService,
    
  ) {
    this.userForm = {} as FormGroup;
    this.currentUser = {} as User;
    this.userDetails = {} as User
    this.disabled = true;
    this.edit = false;
   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);

    this.initializeUserForm();
    
    
  }
  

  public initializeUserForm():void{
    if (this.currentUser.address) {
      if(this.currentUser.address[0]){
        this.userForm =  this.formBuilder.group({
          houseNo:[this.currentUser.address[0].houseNo,[Validators.required]],
          city:[this.currentUser.address[0].city,[Validators.required]],
          state:[this.currentUser.address[0].state,[Validators.required]], 
          landmark:[this.currentUser.address[0].landmark,[Validators.required] ],
        })
      }
      else{
        console.log("else part");
        this.userForm =  this.formBuilder.group({
          houseNo:["",[Validators.required]],
          city:["",[Validators.required]],
          state:["",[Validators.required]], 
          landmark:["",[Validators.required] ],
        })
      }
    }
   
   

   
    
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
   
    this.edit = !this.edit
  }
  get userFormControls(){
    return this.userForm.controls;
  }

  public onSubmit():void{
    this.updatedDetails = this.userForm.getRawValue();
   
    this.formService.updateUser(this.currentUser.id, {address:[this.updatedDetails]}).subscribe((res:any)=>{
     localStorage.setItem('currentUser', JSON.stringify({
       id:res.id,
       firstname: res.firstname,
       lastname: res.lastname,
       username: res.username,
       address: res.address? res.address:[],
       payment: res.payment? res.payment: []
     }))

     this.authenticationService.currentUserUpdate = {
      id:res.id,
      firstName: res.firstName,
      lastName: res.lastName,
      username: res.username,
      address: res.address? res.address:[],
      payment: res.payment? res.payment: []
    }
     
      
      
    })
    this.formService.getUsersDetails().subscribe((res: User[])=>{
      localStorage.setItem("users", JSON.stringify(res))
    })
    this.toggleEdit();
  }

}
