import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { World } from '../../model/world';
import { handleError } from '../../shared';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReportService {

  readonly baseUrl = `${environment.reportServiceUrl}/v1/report/world`;

  constructor(private http: HttpClient) {}

  /** GET worlds from the BioEvo Report Service */
  getWorlds(): Observable<World[]> {
    return this.http.get<World[]>(this.baseUrl)
      .pipe(
        tap(worlds => this.log('fetched worlds')),
        catchError(handleError('getWorlds'))
      ) as Observable<World[]>;
  }

  /** GET specified world data from the BioEvo Report Service */
  getWorld(worldId: number): Observable<World> {
    return this.http.get<World>(this.baseUrl + '/' + worldId)
      .pipe(
        tap(world => this.log('fetched world with id: ' + worldId)),
        catchError(handleError('getWorld'))
      ) as Observable<World>;
  }

  private log(message: string) {
    console.log(`ReportService: ${message}`);
  }

}
