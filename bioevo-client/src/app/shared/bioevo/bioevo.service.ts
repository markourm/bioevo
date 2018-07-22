import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { WorldResponse } from '../../model/world.response';

@Injectable()
export class BioEvoService {

  readonly baseUrl = 'http://localhost:8502/v1/world';

  constructor(private http: HttpClient) {}

  createWorld(): Observable<WorldResponse> {
    return this.http.post<WorldResponse>(this.baseUrl, null)
       .pipe(
          tap(response => this.log(`created world`)),
          catchError(this.handleError('createWorld'))
      ) as Observable<WorldResponse>;
  }

  doSteps(worldId, steps): Observable<WorldResponse> {

    const url = this.baseUrl + '/' + worldId + '/step/' + steps;

    return this.http.post<WorldResponse>(url, null)
        .pipe(
          tap(response => this.log(`advanced world ` + worldId)),
          catchError(this.handleError('doSteps'))
      ) as Observable<WorldResponse>;
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
  private handleError<T> (operation = 'operation') {

    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error);

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        (error.error instanceof ProgressEvent) ?
          'failed to connect to remote service' :
          `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };

  }

  private log(message: string) {
    console.log('BioEvoService: ' + message);
  }

}
