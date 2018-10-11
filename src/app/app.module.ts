import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule.forRoot([]), // Router is required by Nebular
    BrowserModule,
    HttpClientModule,
    NbLayoutModule,
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
