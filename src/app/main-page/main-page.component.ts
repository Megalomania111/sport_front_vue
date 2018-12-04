import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthResult, NbAuthService, NbAuthSocialLink} from '@nebular/auth';
import {Router} from '@angular/router';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {



  token: string = '';
  logedUserEmail : string = '';
  events: any = {};



  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              protected router: Router) {

    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.token = token.getValue();
          this.logedUserEmail = token.getPayload().sub;
        }

      });
  }


  ngOnInit(): void {

    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });


    this.httpClient.get('http://localhost:4200/findAllEvents',  {headers : header})
      .subscribe(
        data  => {
          this.events = data;
        },
        error => {
          console.log('Error', error);
        }
      );




  }

}
