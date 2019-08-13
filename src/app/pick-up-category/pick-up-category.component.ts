import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pick-up-category',
  templateUrl: './pick-up-category.component.html',
  styleUrls: ['./pick-up-category.component.scss']
})
export class PickUpCategoryComponent implements OnInit {

  categories: any = [];
  token: any = '';
  loggedUserEmail: any = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router) {

    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

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
  }



  ngOnInit() {
  }

  addNew() {
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
          alert('Error ' + error);
        }
      );
  }
}
