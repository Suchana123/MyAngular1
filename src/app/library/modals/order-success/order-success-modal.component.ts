import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { OrderDetails } from 'src/app/models/order';
import { foodDetails } from 'src/app/models/foodDetails';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { OrderStatus } from 'src/app/models/order';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success-modal.component.html',
  styleUrls: ['./order-success-modal.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  @ViewChild ('podcastInfo', {static:true}) podcastInfo : any;
 
  //@Input() foodItem : foodDetails;
  //@Input() PlaceOrder : boolean;
  public isAddress: boolean;
  @Input() orderDetails!: OrderStatus;

  public confirmOrderList: OrderDetails[];
  public updatedList: OrderDetails[];
  public currentUser: User;
  public tax: number;

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private authenticationService: UserAuthService,
    ) { 
   
    this.confirmOrderList = {} as OrderDetails[];
    this.updatedList = {} as OrderDetails[];
    //this.foodItem = {} as foodDetails;
    //this.PlaceOrder = false;
    this.currentUser = {} as User;
    this.isAddress = false;
    this.tax =0;
  }

  ngOnInit(): void {
    //console.log(this.foodItem);
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.orderService.confirmOrderList.subscribe((list: OrderDetails[]) => this.confirmOrderList = list);
    if (this.currentUser.address) {
      if(this.currentUser.address[0]){
        this.isAddress = false;
      }
      else{
        this.isAddress = true;
      }
    }
   

  }

  public showModal() {
      this.podcastInfo.show();
  }

  public close() {
    this.router.navigate(['/home']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }


}
