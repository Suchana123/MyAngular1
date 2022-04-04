import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user'
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  // register(user: User) {
  //     return this.http.post(`${environment.apiUrl}/users/register`, user);
  // }

  public register(formData:User):Observable<User>{
    return this.http.post<User>('http://localhost:3000/users',formData)
  }

  getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }


}
