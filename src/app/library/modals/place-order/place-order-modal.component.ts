import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { OrderDetails } from 'src/app/models/order';
import { foodDetails } from 'src/app/models/foodDetails';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-place-order-modal',
  templateUrl: './place-order-modal.component.html',
  styleUrls: ['./place-order-modal.component.scss']
})
export class PlaceOrderComponentModal implements OnInit {
  @ViewChild ('podcastInfo', {static:true}) podcastInfo : any;
  @Input() firstButtonText : string;
  @Input() seconButtonText : string;
  @Input() foodItem : foodDetails;
  @Input() PlaceOrder : boolean;
  public isAddress: boolean;

  public confirmOrderList: OrderDetails[];
  public updatedList: OrderDetails[];
  public currentUser: User;
  public tax: number;

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private authenticationService: UserAuthService,
    ) { 
    this.firstButtonText = this.seconButtonText = "";
    this.confirmOrderList = {} as OrderDetails[];
    this.updatedList = {} as OrderDetails[];
    this.foodItem = {} as foodDetails;
    this.PlaceOrder = false;
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
    this.podcastInfo.hide();
  }

  public addItem(foodItem: foodDetails):void{
    //console.log(this.confirmOrderList);
    if(this.confirmOrderList){
      let f = this.confirmOrderList.find((item: OrderDetails)=>{
         if(foodItem.id === item.foodId){  
           return true;
         }
         else{
           return false;
         }
      });
      if(f){
        let quantity = f.quantity +=1;
        let price = quantity * f.basePrice;
        f.quantity = quantity;
        f.itemPrice = price;    
      }
      else{
        this.confirmOrderList.push({
          basePrice: foodItem.cost,
          imageUrl: foodItem.imageUrl,
          quantity: 1,
          itemPrice: foodItem.cost,
          foodId: foodItem.id,
          foodName: foodItem.dishName,
          desc: foodItem.description
        })
      }
      localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
      this.orderService.orderUpdate = this.confirmOrderList;
      
    }
    else{
      this.confirmOrderList = []
      this.confirmOrderList.push({
        basePrice: foodItem.cost,
        imageUrl: foodItem.imageUrl,
        quantity: 1,
        itemPrice: foodItem.cost,
        foodId: foodItem.id,
          foodName: foodItem.dishName,
          desc: foodItem.description
      });
      localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
     this.orderService.orderUpdate = this.confirmOrderList;

    }
    this.podcastInfo.hide();
    this.router.navigate(['/my-cart']);
  }

  public placeOrder(foodItem: foodDetails): void{
    this.confirmOrderList = []
    this.confirmOrderList.push({
      basePrice: foodItem.cost,
      imageUrl: foodItem.imageUrl,
      quantity: 1,
      itemPrice: foodItem.cost,
      foodId: foodItem.id,
      foodName: foodItem.dishName,
      desc: foodItem.description
    });
    localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
    this.orderService.confirmOrderUpdate = this.confirmOrderList;

    this.tax = Math.floor((foodItem.cost * 10) / 100)
    this.orderService.setTotal = foodItem.cost + this.tax
    //this.modalService.dismissAll()
    this.router.navigate(['/placeorder']);
  }

}
