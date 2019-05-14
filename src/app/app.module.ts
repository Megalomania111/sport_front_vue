import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {NbAuthJWTToken, NbAuthModule, NbAuthSimpleToken, NbPasswordAuthStrategy} from '@nebular/auth';
import {AppRoutingModule, routes} from './app-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { PickUpCategoryComponent } from './pick-up-category/pick-up-category.component';
import { AppEditUserComponent } from './app-edit-user/app-edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddNewEventComponent,
    PickUpCategoryComponent,
    AppEditUserComponent
  ],
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },
          baseEndpoint: 'http://localhost:4200/',
          login: {
            endpoint: 'login',
            method: 'post',
            redirect: {
              success: 'app-pick-up-category',
              failure: 'auth/login'
            }
          },

          logout: {
            endpoint: '/logout',
            method: 'post',
            redirect: {
              success: 'auth/login',
              failure: '/auth/sign-up'
            }
          },
          requestPass: {
            endpoint: '/changePassword',
            method: 'post',
            redirect: {
              success: 'auth/login',
              failure: '/auth/register'
            }
          },
          register: {
                      endpoint: '/register',
                      method: 'post',
                      redirect: {
                        success: 'auth/login',
                        failure: '/auth/register'
                      }
                    },
        }),
      ],
      forms: {
        login: {
          rememberMe: false,
        }
      },
    }),
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    RouterModule.forRoot(routes, {useHash: true}), // Router is required by Nebular
    BrowserModule,
    HttpClientModule,
    NbButtonModule,
    AppRoutingModule,
    CommonModule,
    NbSelectModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  exports: [ RouterModule ],
  bootstrap: [AppComponent, MainPageComponent, AddNewEventComponent, PickUpCategoryComponent]
})
export class AppModule {
}
