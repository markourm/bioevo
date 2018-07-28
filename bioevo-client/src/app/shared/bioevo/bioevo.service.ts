import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { WorldResponse } from '../../model/world.response';
import { handleError } from '..';

@Injectable()
export class BioEvoService {

  readonly baseUrl = 'http://localhost:8502/v1/world';

  constructor(private http: HttpClient) {}

  createWorld(): Observable<WorldResponse> {
    return this.http.post<WorldResponse>(this.baseUrl, null)
       .pipe(
          tap(response => this.log(`created world`)),
          catchError(handleError('createWorld'))
      ) as Observable<WorldResponse>;
  }

  doSteps(worldId, steps): Observable<WorldResponse> {

    const url = this.baseUrl + '/' + worldId + '/step/' + steps;

    return this.http.post<WorldResponse>(url, null)
        .pipe(
          tap(response => this.log(`advanced world ` + worldId)),
          catchError(handleError('doSteps'))
      ) as Observable<WorldResponse>;
  }

  private log(message: string) {
    console.log('BioEvoService: ' + message);
  }

}
