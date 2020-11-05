import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(private http: HttpClient) { }

  get(url: string) {
    this.makeHeaderRequest();
    return this.http.get(url, this.httpOptions);
  }

  post(url: string, params: any, headerCustom?: HttpHeaders) {
    if (headerCustom) {
      this.httpOptions.headers = headerCustom;
    } else {
      this.makeHeaderRequest();
    }
    return this.http.post(url, params, this.httpOptions);
  }

  put(url: string, params: any, options?: any) {
    if (options) {
      this.httpOptions.headers = options;
    } else {
      this.makeHeaderRequest();
    }
    return this.http.put(url, params, this.httpOptions);
  }

  delete(url: string, options?: any) {
    if (options) {
      this.httpOptions.headers = options;
    } else {
      this.makeHeaderRequest();
    }
    return this.http.delete(url, this.httpOptions);
  }

  makeHeaderRequest() {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + apiKey
        })
      };
    }
  }
}
