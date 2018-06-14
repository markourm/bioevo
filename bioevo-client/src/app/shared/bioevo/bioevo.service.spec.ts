import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

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
  
});
