import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.scss']
})
export class AddNewEventComponent implements OnInit {

  token: any = '';
  event: any = {};
  someDate: string;
  categories: any = [];
  loggedUserEmail: any = '';
  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router) {

    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        this.service.getToken();
        if (token.isValid()) {
          this.token = token.getValue();
          this.loggedUserEmail = token.getPayload().sub;
        }

      });
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });


    this.httpClient.get('http://localhost:4200/findUniqueEventCategory', {headers : header})
      .subscribe(
        data => {

          this.categories = data;
        },
        error => {
          alert(('Error ' + error));
        }
      );
  //  this.categories = ['Basen', 'Bieg' ];
  }


  add(): void {


    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });

    console.log('date input', this.event);

    this.httpClient.post('http://localhost:4200/addEvent', this.event, {headers : header})
      .subscribe(
        data => {
          alert('Successfully done');
          this.router.navigate(['app-main-page', this.event.category ]);
        },
        error => {
          alert(('Error ' + error));
          this.router.navigateByUrl('app-add-new-event');
        }
      );
  }


  ngOnInit() {
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
          alert('Error ' + error);
        }
      );
  }
}
