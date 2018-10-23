import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {AppRoutingModule, routes} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule.forRoot(routes, { useHash: true }), // Router is required by Nebular
    BrowserModule,
    HttpClientModule,
    NbLayoutModule,
    NbButtonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
