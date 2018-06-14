import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BioEvoService } from './bioevo.service';

describe('BioEvoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BioEvoService],
	  imports: [
	    HttpClientModule
	  ]
    });
  });

  it('should be created', inject([BioEvoService], (service: BioEvoService) => {
    expect(service).toBeTruthy();
  }));
});
