import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {MainPageComponent} from './main-page/main-page.component';
import {AddNewEventComponent} from './add-new-event/add-new-event.component';
import {PickUpCategoryComponent} from './pick-up-category/pick-up-category.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule {
}

export const routes: Routes = [
  {
    path: 'app-main-page/:cat',
    component: MainPageComponent,
  },
  {
    path: 'app-add-new-event',
    component: AddNewEventComponent,
  },
  {
    path: 'app-pick-up-category',
    component: PickUpCategoryComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },

];
