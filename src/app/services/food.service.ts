import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { foodDetails } from '../models/foodDetails';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getFoodList():Observable<foodDetails[]>{
    return this.http.get<foodDetails[]>("http://localhost:3000/foodList");
  }

  // public placeOrder(orderDetails: IOrder): Observable<IOrder>{
  //   return this.http.post<IOrder>('http://localhost:3000/orders', orderDetails);
  // }

  // public getOrdersList(): Observable<IOrder[]>{
  //   return this.http.get<IOrder[]>('http://localhost:3000/orders');
  // }

  // public updateOrderList(id: any, orderDetails: IOrder ): Observable<IOrder>{
  //   return this.http.patch<IOrder>(`http://localhost:3000/orders/${id}`, orderDetails);
  // }
}
