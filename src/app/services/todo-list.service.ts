import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';
import { environment } from '../../environments/environment';

import { IList } from '../modals/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private restService: RestService) { }

  getLists(): Observable<IList[]> {
    return this.restService.get(environment.apiUrl + '/lists')
      .pipe(
        map(d => {
          if (d) {
            return d as IList[];
          }
          throwError('Error');
        }
      ));
  }

  createList(name: string): Observable<IList> {
    const params = {
      name
    };
    return this.restService.post(environment.apiUrl + '/lists', params)
      .pipe(
        map(d => {
          if (d) {
            return d as IList;
          }
          throwError('Error');
        }
      ));
  }

  updateList(listId: number, name: string): Observable<IList> {
    const params = {
      name
    };
    return this.restService.put(environment.apiUrl + '/lists/' + listId, params)
      .pipe(
        map(d => {
          if (d) {
            return d as IList;
          }
          throwError('Error');
        }
      ));
  }

  deleteList(listId: number): Observable<boolean> {
    return this.restService.delete(environment.apiUrl + '/lists/' + listId)
      .pipe(
        map(d => {
          if (d) {
            return true;
          }
          throwError('Error');
        }
      ));
  }
}
