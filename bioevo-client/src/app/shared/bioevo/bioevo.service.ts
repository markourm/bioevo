import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BioEvoService {

  baseUrl = 'http://localhost:8502/v1/world';

  constructor(private http: HttpClient) {}
  
  createWorld(): Observable<any> {
    return this.http.post(this.baseUrl, null);
  }
  
  doSteps(worldId, steps): Observable<any> {
  
    const url = this.baseUrl + '/' + worldId + '/step/' + steps;
  
    return this.http.post(url, null);
  }    
  
}
