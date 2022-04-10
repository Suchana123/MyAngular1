import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './views/registration/registration.component';
import { LoginComponent } from './views/login/login.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MyCartComponent } from './views/my-cart/my-cart.component';
import { SettingsComponent } from './views/profile/settings.component';
import { UserAddressComponent } from './views/profile/user-address/user-address.component';
import { UserAddPaymentDetailsComponent } from './views/profile/user-add-payment-details/user-add-payment-details.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordreset', component: ForgetPasswordComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'my-cart', component: MyCartComponent },
  {path: 'settings', component: SettingsComponent,
  children:[
    { path: 'userprofile', component: EditProfileComponent, canActivate:[AuthGuard]},
    { path: 'useraddaddress', component: UserAddressComponent, canActivate:[AuthGuard]},
    { path: 'useraddpaymentdetails', component: UserAddPaymentDetailsComponent, canActivate:[AuthGuard]},
  ],
 },
 { path: '**', redirectTo: '/registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
