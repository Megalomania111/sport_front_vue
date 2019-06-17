import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import { DatePipe } from '@angular/common';
// import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-app-edit-user',
  templateUrl: './app-edit-user.component.html',
  providers: [DatePipe],
  styleUrls: ['./app-edit-user.component.scss']
})
export class AppEditUserComponent implements OnInit {


  private userEmail: string;
  private user: any;
  private userResultWeight ;
  private userEvets;
  private oldEvents = [];
  private futureEvents = [];
  token: string = '';
  loggedUserEmail: string = '';
  header: HttpHeaders;

  constructor(protected service: NbAuthService,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router,
              private datePipe: DatePipe) {
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


    this.httpClient.post<any>('http://localhost:4200/findOneByEmail', {"email": this.userEmail}, {headers: this.header})
      .subscribe(
        data => {
          console.log(data);
          this.user = data;
          this.userResultWeight = data.weight;

          this.httpClient.post<any>('http://localhost:4200/findUserEvents', {"email": this.userEmail}, {headers: this.header})
            .subscribe(
              data => {
                this.userEvets = data;
                console.log('Event --> ', this.userEvets);
                for (let event of this.userEvets) {
                  if (event.date != null) {
                    const todayDate = new Date(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
                    const eventDate = new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd'));
                    if (todayDate > eventDate) {
                      this.oldEvents.push(event);
                      if (event.level == '1') {
                        this.userResultWeight = this.userResultWeight + 1;
                      }
                      if (event.level == '-1') {
                        this.userResultWeight = this.userResultWeight - 1;
                      }
                      console.log(todayDate > eventDate);
                    } else {
                      this.futureEvents.push(event);
                    }
                  }
                }

              },
              error => {
                console.log('Error', error);
              }
            );


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
