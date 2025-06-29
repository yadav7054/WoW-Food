import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'footer',component:FooterComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'menu',component:MenuComponent},
  {path:'cart',component:CartComponent},
  {path:'order-summary',component:OrderSummaryComponent},
  {path:'order-history',component:OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
