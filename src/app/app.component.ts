import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  greeting = {};
  constructor(private http: HttpClient) {
    http.get(environment.API_URL + 'resource').subscribe(data => this.greeting = data);
  }
}
