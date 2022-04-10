import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body, params } = request;
       console.log("inside fake backend");
        let users = JSON.parse(localStorage.getItem('users')||"[{}]") || [];
        
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {              
                case url.endsWith('/users') && method === 'POST':
                    return register();

                case url.endsWith('/login') && method === 'GET':
                    return authenticate();

                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function register() {
            console.log("inside register");
            const user = body;
            console.log(user);
           
            if (users.find((x:any) => x.username === user.username)) { 
                console.log("error occured");  
                //return error();
                return error('Email "' + user.username + '" is already taken');
            }
            console.log("user", user);
            user.id = users.length ? users.length + 1 : 1;
            console.log(user.id);
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return next.handle(request);
        }

        function authenticate() {
            console.log("Inside auth");
            console.log(users);
            const username = params.get("username");
            const password = params.get("password");
            if (users.length==1){
                return error('username not found. Kindly register');
            }
            else {
                const user = users.find((x:any) => x.username === username && x.password === password);
                if (!user) return error('Email or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address? user.address: [],
                    payment: user.payment? user.payment: [],
                    
                })
            }
           
        }

      

      

        // helper functions
        function ok(body?:any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: any) {
            return throwError(()=>{
                new Error(message);
            });
        }

       

      

       
   

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};