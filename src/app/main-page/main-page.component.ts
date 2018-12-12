import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  token: string = '';
  loggedUserEmail: string = '';
  category : string = '';
  events: any = null;
  eventsToView: any = null;
  isAuthenticated : boolean = false;
  input = '';



  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              private route: ActivatedRoute,
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

  onKey(event: any) { // without type info
    if (event.target.value.length == 0) {

      this.eventsToView.concat(this.events);
    }

    let res1 = [];
    res1 = this.events.filter(e => e.city.toLowerCase().includes(event.target.value.toLowerCase()));
    if (res1.length > 0) {
      this.eventsToView = res1;
    }
    let res2 = [];
    res2 = this.events.filter(e => e.description.toLowerCase().includes(event.target.value.toLowerCase()));

    if (res2.length > 0) {
      this.eventsToView = res2;
    } else {
      this.eventsToView = [];
    }

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
          alert('Error '+ error);
        }
      );
  }

  ngOnInit(): void {

    this.category = this.route.snapshot.params.cat;

    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });


    this.httpClient.post('http://localhost:4200/findEventsByCategory',{"category" : this.category}, {headers: header})
      .subscribe(
        data  => {
          this.events = data;
          this.eventsToView = data;
        },
        error => {
          console.log('Error', error);
        }
      );




  }

}
