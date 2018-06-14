import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}
  
  getWorlds(): Observable<any> {
    return this.http.get('http://localhost:8501/v1/report/world');
  }
  
}
