import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authenticationService: UserAuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.orderService.clearConfirmOrderList();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
