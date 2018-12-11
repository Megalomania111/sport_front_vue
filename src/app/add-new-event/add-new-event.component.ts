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

  token: string = '';
  event: any = {};

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
        }

      });

  }



  add(): void {


    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });


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

}
