import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './views/registration/registration.component';
import { LoginComponent } from './views/login/login.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MyCartComponent } from './views/my-cart/my-cart.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordreset', component: ForgetPasswordComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'my-cart', component: MyCartComponent },
  { path: '**', redirectTo: '/registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
