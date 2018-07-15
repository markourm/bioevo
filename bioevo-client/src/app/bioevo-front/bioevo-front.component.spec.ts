import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { asyncData, asyncError }  from '../../testing';
import { of, throwError } from 'rxjs';
import { last } from 'rxjs/operators';

import { ReportService, BioEvoService } from '../shared';
import { BioevoFrontComponent } from './bioevo-front.component';

describe('BioevoFrontComponent', () => {

  let component: BioevoFrontComponent;
  let fixture: ComponentFixture<BioevoFrontComponent>;
  
  let getWorldsSpy: jasmine.Spy;
  let createWorldSpy: jasmine.Spy;
  
  let frontElement: HTMLElement;
  let worlds: Object[];
  let createWorldResponse: Object;
  
  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
  
    worlds = [
        { id: 1, currentStepId: 1 },
        { id: 5, currentStepId: 30 },
       ] as Object[];
    createWorldResponse = { worldId: 2 };
       
    const reportService = jasmine.createSpyObj('ReportService', ['getWorlds']);
    getWorldsSpy = reportService.getWorlds.and.returnValue(of(worlds));
    
    const bioEvoService = jasmine.createSpyObj('BioEvoService', ['createWorld','doSteps']);
    createWorldSpy = bioEvoService.createWorld.and.returnValue(of(createWorldResponse));
  
    TestBed.configureTestingModule({
      declarations: [ BioevoFrontComponent ],
	  providers:    [
        { provide: ReportService, useValue: reportService },
        { provide: BioEvoService, useValue: bioEvoService }
      ],
      imports: [
	    HttpClientModule
	  ]
    });
    //.compileComponents();
    fixture = TestBed.createComponent(BioevoFrontComponent);
    component = fixture.componentInstance;
    frontElement = fixture.nativeElement;
  });

  describe('when test with synchronous observable', () => {

	  it('should create', () => {
	    expect(component).toBeTruthy();
	  });
	  
	  it('should have <h2> with "Worlds"', () => {
	    const h2 = frontElement.querySelector('h2');
	    expect(h2.textContent).toEqual('Worlds');
	  });
	  
	  it('should have empty world list after component initialized', () => {
	    fixture.detectChanges();

	    const worlds = frontElement.querySelector('.worlds');
	    expect(errorMessage()).toBeNull('should not show error');
	    expect(getWorldsSpy.calls.any()).toBe(true, 'getWorlds called');
	   });
   
   });
  
});
