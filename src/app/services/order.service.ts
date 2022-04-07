import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetails } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private confirmOrderSubject: BehaviorSubject<OrderDetails[]>;
  public confirmOrderList: Observable<OrderDetails[]>;
  private total: number;

  constructor() {
    this.confirmOrderSubject = new BehaviorSubject<OrderDetails[]>(JSON.parse(localStorage.getItem('confirmOrder')||"[]"));
    this.confirmOrderList = this.confirmOrderSubject.asObservable();
    this.total  = 0;
   }

   public set orderUpdate(list: OrderDetails[]){
    this.confirmOrderSubject.next(list);
  }

  public set setTotal(sum: number){
    this.total = sum;
  }
}
