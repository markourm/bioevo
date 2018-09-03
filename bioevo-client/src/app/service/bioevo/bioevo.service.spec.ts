import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { WorldResponse } from '../../model/world.response';
import { BioEvoService } from './bioevo.service';

describe('BioEvoService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let bioEvoService: BioEvoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BioEvoService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    bioEvoService = TestBed.get(BioEvoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([BioEvoService], (service: BioEvoService) => {
    expect(service).toBeTruthy();
  }));

  describe('#createWorld', () => {
    const createWorldUrl = 'http://localhost:8502/v1/world';
    const worldResponse: WorldResponse = { worldId: 1 };

    it('should create a new world', () => {
      bioEvoService.createWorld().subscribe(
        data => expect(data).toEqual(worldResponse, 'should return the world id'),
        fail
      );

      const req = httpTestingController.expectOne(createWorldUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(null);

      const expectedResponse = new HttpResponse(
        { status: 201, statusText: 'Created', body: worldResponse });
      req.event(expectedResponse);
    });

    it('should handle 404', () => {
      const msg = 'Deliberate 404';
      bioEvoService.createWorld().subscribe(
        data => fail('expected to fail'),
        error => expect(error.message).toContain('404 Not Found')
      );

      const req = httpTestingController.expectOne(createWorldUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

  });

  describe('#doSteps', () => {

    it('should calculate next steps', () => {
      const worldId = 5;
      const steps = 4;
      const doStepsUrl = 'http://localhost:8502/v1/world/' + worldId + '/step/' + steps;
      const doStepsResponse = { worldId: worldId, message: 'Started calculating next ' + steps + ' step(s)' };

      bioEvoService.doSteps(worldId, steps).subscribe(
        data => expect(data).toEqual(doStepsResponse, 'should return the world id and message'),
        fail
      );

      const req = httpTestingController.expectOne(doStepsUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(null);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: doStepsResponse });
      req.event(expectedResponse);
    });

    it('should handle 404', () => {
      const worldId = 5;
      const steps = 4;
      const doStepsUrl = 'http://localhost:8502/v1/world/' + worldId + '/step/' + steps;
      const msg = 'Deliberate 404';

      bioEvoService.doSteps(worldId, steps).subscribe(
        data => fail('expected to fail'),
        error => expect(error.message).toContain('404 Not Found')
      );

      const req = httpTestingController.expectOne(doStepsUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

  });

});
