import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private restService: RestService) { }

  login(auth: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${auth.username}:${auth.password}`)
    });
    return this.restService.post(environment.apiUrl + '/auth/login', null, headers)
      .pipe(
        map(d => {
          return d;
        },
          throwError('Could not be authenticated')
        ));
  }

  logout(): Observable<boolean> {
    return this.restService.post(environment.apiUrl + '/auth/logout', null)
      .pipe(
        map(d => {
          return true;
        },
          throwError('Could not be authenticated')
        ));
  }

  loggedIn(): boolean {
    return (localStorage.getItem('apiKey') !== null);
  }
}
