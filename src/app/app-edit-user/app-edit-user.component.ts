import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'app-app-edit-user',
  templateUrl: './app-edit-user.component.html',
  styleUrls: ['./app-edit-user.component.scss']
})
export class AppEditUserComponent implements OnInit {


  private userEmail: string;
  private user: any;
  token: string = '';
  loggedUserEmail: string = '';
  header: HttpHeaders;

  constructor(protected service: NbAuthService,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router) {
  }

  ngOnInit() {
    this.userEmail = this.activatedRoute.snapshot.params.email;


    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.token = token.getValue();
          this.loggedUserEmail = token.getPayload().sub;
        }

      });


     this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });


    this.httpClient.post('http://localhost:4200/findOneByEmail', {"email": this.userEmail}, {headers: this.header})
      .subscribe(
        data => {
          this.user = data;

        },
        error => {
          console.log('Error', error);
        }
      );

  }

  save(): void {
    this.httpClient.post('http://localhost:4200/update', this.user, {headers: this.header})
      .subscribe(
        data => {
          this.router.navigate(['app-pick-up-category']);

        },
        error => {
          console.log('Error', error);
        }
      );
  }

}
