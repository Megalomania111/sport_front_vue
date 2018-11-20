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


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken
          },
          baseEndpoint: 'http://localhost:4200/',
          login: {
            endpoint: 'login',
            method: 'post',
            redirect: {
              success: 'app-main-page',
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
            endpoint: '/auth/register',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, MainPageComponent]
})
export class AppModule {
}
