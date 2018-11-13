import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {NbAuthModule, NbAuthSimpleToken, NbPasswordAuthStrategy} from '@nebular/auth';
import {AppRoutingModule, routes} from './app-routing.module';
import {MainPageComponent} from './main-page/main-page.component';


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
            class: NbAuthSimpleToken
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
    RouterModule.forRoot(routes, {useHash: true}), // Router is required by Nebular
    BrowserModule,
    HttpClientModule,
    NbLayoutModule,
    NbButtonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
