import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from '../../environments/environment'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || "null"));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public set currentUserUpdate(user: User){
        this.currentUserSubject.next(user);
      }

    login(username : string, password : string) {

          return this.http.get<any>(`http://localhost:3000/login`,  {params:{"username": username, "password": password}})
          .pipe(map((user:any) => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log(user);
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next("");
    }
}
