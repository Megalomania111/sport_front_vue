import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import { DatePipe } from '@angular/common';

declare var $: any;
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
  token: any = '';
  loggedUserEmail: any = '';
  private oldEvents = [];
  private futureEvents = [];
  header: HttpHeaders;

  constructor(protected service: NbAuthService,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router,
              private datePipe: DatePipe) {

    this.service.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        this.service.getToken();
        if (token.isValid()) {
          this.token = token.getValue();
          this.loggedUserEmail = token.getPayload().sub;
        }

      });

  }

  ngOnInit() {
    $('.open-pop-up').on('click', function() {
      $('.popap').removeClass('hidden');
      console.log('sdsd');
    });
    $(document).mouseup(function(e) {
      const container = $('.popap');
      if (container.has(e.target).length === 0) {
        container.addClass('hidden');
      }
    });

    // $('.close-pop-up').on('click', function() {
    //   $('.popap').addClass('hidden');
    // });





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


    this.httpClient.post<any>('http://localhost:4200/findOneByEmail', {'email': this.userEmail}, {headers: this.header})
      .subscribe(
        data => {
          this.user = data;
          this.userResultWeight = data.weight;

          this.httpClient.post<any>('http://localhost:4200/findUserEvents', {'email': this.userEmail}, {headers: this.header})
            .subscribe(
              data1 => {
                this.userEvets = data1;
                console.log('Event --> ', this.userEvets);
                for (const event of this.userEvets) {
                  if (event.date != null) {
                    const todayDate = new Date(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
                    const eventDate = new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd'));
                    if (todayDate > eventDate) {
                      this.oldEvents.push(event);
                      if (event.level === '1') {
                        this.userResultWeight = this.userResultWeight + 1;
                      }
                      if (event.level === '-1') {
                        this.userResultWeight = this.userResultWeight - 1;
                      }
                      console.log(todayDate > eventDate);
                    } else {
                      this.futureEvents.push(event);
                    }
                  } else  {
                    this.oldEvents.push(event);
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
