import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { World } from '../../model/world';

@Injectable()
export class ReportService {

  readonly worldsUrl = 'http://localhost:8501/v1/report/world';

  constructor(private http: HttpClient) {}

  /** GET worlds from the BioEvo Report Service */
  getWorlds(): Observable<World[]> {
    return this.http.get<World[]>(this.worldsUrl)
      .pipe(
        tap(worlds => this.log(`fetched worlds`)),
        catchError(this.handleError('getWorlds'))
      ) as Observable<World[]>;
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
    console.log('ReportService: ' + message);
  }

}
