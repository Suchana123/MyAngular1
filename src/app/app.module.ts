import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {ModalModule} from 'ng-uikit-pro-standard'
import { fakeBackendProvider } from './_helper/fake-backend';

//mdb module
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';


import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainNavigationComponent } from './library/main-navigation/main-navigation.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { LoginComponent } from './views/login/login.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { AlertComponent} from './library/alert/alert.component';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FoodCardComponent } from './library/cards/food-card/food-card.component';
import { PlaceOrderComponentModal } from './library/modals/place-order/place-order-modal.component';
import { MyCartComponent } from './views/my-cart/my-cart.component';
import { SettingsComponent } from './views/profile/settings.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import {UserAddressComponent} from './views/profile/user-address/user-address.component';
import { PaymentDetailsComponent } from './views/profile/payment-details/payment-details.component';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { OrderSuccessComponent } from './library/modals/order-success/order-success-modal.component';
import { OrderHistoryComponent } from './views/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainNavigationComponent,
    RegistrationComponent,
    LoginComponent,
    ForgetPasswordComponent,
    AlertComponent,
    HomeComponent,
    DashboardComponent,
    FoodCardComponent,
    PlaceOrderComponentModal,
    PlaceOrderComponent,
    MyCartComponent,
    SettingsComponent,
    EditProfileComponent,
    UserAddressComponent,
    PaymentDetailsComponent,
    OrderSuccessComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    //mdb module
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    ModalModule.forRoot()
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
