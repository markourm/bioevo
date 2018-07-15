import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { World } from '../../model/world';
import { ReportService } from './report.service';

describe('ReportService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let reportService: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ReportService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    reportService = TestBed.get(ReportService);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('#getWorlds', () => {
    const getWorldsUrl = 'http://localhost:8501/v1/report/world';
    let expectedWorlds: World[];

    beforeEach(() => {
      expectedWorlds = [
        { id: 1, currentStepId: 1 },
        { id: 5, currentStepId: 30 },
       ] as World[];
    });

    it('should return expected worlds (called once)', () => {
      reportService.getWorlds().subscribe(
        worlds => expect(worlds).toEqual(expectedWorlds, 'should return expected worlds'),
        fail
      );

      // ReportService should have made one request to GET worlds from expected URL
      const req = httpTestingController.expectOne(getWorldsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock worlds
      req.flush(expectedWorlds);
    });

    it('should be OK returning no worlds', () => {
      reportService.getWorlds().subscribe(
        worlds => expect(worlds.length).toEqual(0, 'should have empty worlds array'),
        fail
      );

      const req = httpTestingController.expectOne(getWorldsUrl);
      req.flush([]); // Respond with no worlds
    });

    it('should handle 404', () => {
      const msg = 'Deliberate 404';
      reportService.getWorlds().subscribe(
        worlds => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(getWorldsUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected worlds (called multiple times)', () => {
      reportService.getWorlds().subscribe();
      reportService.getWorlds().subscribe();
      reportService.getWorlds().subscribe(
        worlds => expect(worlds).toEqual(expectedWorlds, 'should return expected worlds'),
        fail
      );

      const requests = httpTestingController.match(getWorldsUrl);
      expect(requests.length).toEqual(3, 'calls to getWorlds()');

      // Respond to each request with different mock world results
      requests[0].flush([]);
      requests[1].flush([{id: 9, currentStepId: 25}]);
      requests[2].flush(expectedWorlds);
    });
  });
  
});
