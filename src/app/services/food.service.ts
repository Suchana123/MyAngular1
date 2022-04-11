import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { foodDetails } from '../models/foodDetails';
import { OrderStatus } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getFoodList():Observable<foodDetails[]>{
    return this.http.get<foodDetails[]>("http://localhost:3000/foodList");
  }

  public placeOrder(orderDetails: OrderStatus): Observable<OrderStatus>{
    return this.http.post<OrderStatus>('http://localhost:3000/orders', orderDetails);
  }

  public getOrdersList(): Observable<OrderStatus[]>{
    return this.http.get<OrderStatus[]>('http://localhost:3000/orders');
  }

  public updateOrderList(id: any, orderDetails: OrderStatus ): Observable<OrderStatus>{
    return this.http.patch<OrderStatus>(`http://localhost:3000/orders/${id}`, orderDetails);
  }
}
