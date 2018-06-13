import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ReportService } from './report.service';

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService],
	  imports: [
	    HttpClientModule
	  ]
    });
  });

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
});
