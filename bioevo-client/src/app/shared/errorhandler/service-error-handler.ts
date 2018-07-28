/**
 * Error handler for http services
 */
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

/**
 * Returns a function that handles Http operation failures.
 * This error handler lets the app continue to run as if no error occurred.
 *
 * @param operation - name of the operation that failed
 */
export function handleError<T> (operation = 'operation') {

    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error);

      let message = `server returned code ${error.status} with body "${error.error}"`;

      if (error.error instanceof ErrorEvent) {
        message = error.error.message;
      } else if (error.error instanceof ProgressEvent) {
        message = 'failed to connect to remote service';
      }
      throw new Error(`${operation} failed: ${message}`);
    };

}
