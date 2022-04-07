import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { OrderDetails } from 'src/app/models/order';
import { foodDetails } from 'src/app/models/foodDetails';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  @ViewChild ('podcastInfo', {static:true}) podcastInfo : any;
  @Input() firstButtonText : string;
  @Input() seconButtonText : string;
  @Input() foodItem : foodDetails;

  public confirmOrderList: OrderDetails[];
  public updatedList: OrderDetails[];

  constructor(private orderService: OrderService, private router: Router) { 
    this.firstButtonText = this.seconButtonText = "";
    this.confirmOrderList = {} as OrderDetails[];
    this.updatedList = {} as OrderDetails[];
    this.foodItem = {} as foodDetails;
  }

  ngOnInit(): void {
    //console.log(this.foodItem);
    this.orderService.confirmOrderList.subscribe((list: OrderDetails[]) => this.confirmOrderList = list);
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

}
