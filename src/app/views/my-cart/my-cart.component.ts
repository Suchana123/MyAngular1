import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { OrderService } from 'src/app/services/order.service';
import { foodDetails } from 'src/app/models/foodDetails';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  public OrderList: OrderDetails[];
  public Total: number;
  public tax: number;
  public shippingCharge: number;
  public disabled: boolean;
  public currentUser: User;
  public isAddress: boolean

  constructor(
    private orderService: OrderService,
    private authenticationService: UserAuthService
  ) {
    this.OrderList = {} as OrderDetails[];
    this.Total = 0;
    this.tax = 0;
    this.shippingCharge = 0;
    this.disabled = true;
    this.currentUser = {} as User;
    this.isAddress = true;
   }

  ngOnInit(): void {
    this.orderService.confirmOrderList.subscribe((list: OrderDetails[]) => this.OrderList = list);
    //console.log(this.OrderList);
    this.calculateTax();
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if(this.currentUser.address){
        this.isAddress = this.currentUser.address.length ? true : false;
      }
    });
    //console.log(this.isAddress);
  }

  public calculateTax(): void{
   
    let total = 0;
    this.OrderList.forEach((item)=>{
      total += item.itemPrice;
    })
    this.Total = total;
   
    this.tax = Math.floor((total * 10) / 100)
    this.orderService.setTotal = this.Total + this.tax + (this.OrderList.length === 0? 0: 40)
  }
  
  removeItem(foodList : OrderDetails) {
    this.OrderList = this.OrderList.filter((item)=>{
      if(item.foodId === foodList.foodId){
        return false;
      }
      else{
        return true;
      }
    });
    this.calculateTax();
    localStorage.setItem('confirmOrder', JSON.stringify(this.OrderList));
    this.orderService.orderUpdate = this.OrderList;
  }

}
