import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { UserAuthService } from '../services/user-auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: UserAuthService        
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {      
        const currentUser = this.authenticationService.currentUserValue;
       
        
        if (currentUser) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page  
        this.router.navigate(['/login']);
        return false;
    }
}