import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/models/order';
import { FoodService } from 'src/app/services/food.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public searchText: string;
  public orderHistory: OrderStatus;
  public showOrderHistory: boolean;

  constructor(
    private foodService: FoodService
  ) {
    this.searchText = '';
    this.orderHistory = {} as OrderStatus;
    this.showOrderHistory = false;
   }

  ngOnInit(): void {
  }

  public getOrderHistory(): void{
    this.foodService.getOrdersList().pipe(map((item: OrderStatus[])=>{
      return item.filter((item: OrderStatus)=>{
        return (
          item.id == this.searchText
        )
      })
    })).subscribe((res: OrderStatus[])=>{
      this.orderHistory = res[0];
      this.showOrderHistory = true;
      //this.OrderSuccess.showModal();

    })
   
    
  }

}
