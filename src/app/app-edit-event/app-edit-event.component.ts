import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NB_AUTH_OPTIONS, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './app-edit-event.component.html',
  styleUrls: ['./app-edit-event.component.scss']
})
export class AppEditEventComponent implements OnInit {

  private eventId : any;
  private userEmail: string;
  private event: any;
  token: string = '';
  loggedUserEmail: string = '';
  header: HttpHeaders;
  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              protected router: Router) { }

  ngOnInit() {

    this.eventId = this.activatedRoute.snapshot.params.eventId;



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


    this.httpClient.post('http://localhost:4200/findEventById', {"id": this.eventId}, {headers: this.header})
      .subscribe(
        data => {
          this.event = data;

        },
        error => {
          console.log('Error', error);
        }
      );

  }

  update(){

    this.httpClient.post('http://localhost:4200/editEvent', this.event, {headers: this.header})
      .subscribe(
        data => {
          alert('Successfully done');
          this.router.navigate(['app-main-page', this.event.category ]);

        },
        error => {
          console.log('Error', error);
        }
      );




  }

}
