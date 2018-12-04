import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  token: string = '';
  loggedUserEmail: string = '';
  events: any = null;
];


  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              protected router: Router) {

    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        this.service.getToken();
        if (token.isValid()) {
          this.token = token.getValue();
          this.loggedUserEmail = token.getPayload().sub;
        }

      });
  }

  addNew(): void {

    this.router.navigateByUrl('app-add-new-event');
  }


  logout(): void {

    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });


    this.httpClient.get('http://localhost:4200/logout', {headers: header})
      .subscribe(
        data => {
          this.service.logout('email');
          this.router.navigateByUrl('auth/login');
        },
        error => {
          console.log('Error', error);
        }
      );
  }

  ngOnInit(): void {

    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });


    this.httpClient.get('http://localhost:4200/findAllEvents', {headers: header})
      .subscribe(
        data => {
          this.events = data;
        },
        error => {
          console.log('Error', error);
        }
      );


  }

}
