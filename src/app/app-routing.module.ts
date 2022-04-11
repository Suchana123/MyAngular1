import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './views/registration/registration.component';
import { LoginComponent } from './views/login/login.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MyCartComponent } from './views/my-cart/my-cart.component';
import { SettingsComponent } from './views/profile/settings.component';
import { UserAddressComponent } from './views/profile/user-address/user-address.component';
import { PaymentDetailsComponent } from './views/profile/payment-details/payment-details.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { AuthGuard } from './_helper/auth.guard';
import { OrderHistoryComponent } from './views/order-history/order-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordreset', component: ForgetPasswordComponent },
  { path: 'home', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'my-cart', component: MyCartComponent, canActivate:[AuthGuard] },
  {path: 'placeorder', component: PlaceOrderComponent, canActivate:[AuthGuard]},
  {path: 'order-history', component: OrderHistoryComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent,
  children:[
    { path: 'userprofile', component: EditProfileComponent, canActivate:[AuthGuard]},
    { path: 'useraddaddress', component: UserAddressComponent, canActivate:[AuthGuard]},
    { path: 'paymentdetails', component: PaymentDetailsComponent, canActivate:[AuthGuard]},
  ], canActivate:[AuthGuard]
 },
 { path: '**', redirectTo: '/registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
