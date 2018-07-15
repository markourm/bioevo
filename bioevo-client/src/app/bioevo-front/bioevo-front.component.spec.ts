import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { asyncData, asyncError }  from '../../testing';
import { of, throwError } from 'rxjs';
import { last } from 'rxjs/operators';

import { World } from '../model/world';
import { WorldResponse } from '../model/world.response';
import { ReportService, BioEvoService } from '../shared';
import { BioevoFrontComponent } from './bioevo-front.component';

let fixture: ComponentFixture<BioevoFrontComponent>;
let component: BioevoFrontComponent;
let frontElement: HTMLElement;
let page: Page;

describe('BioevoFrontComponent', () => {  
  
  let getWorldsSpy: jasmine.Spy;
  let createWorldSpy: jasmine.Spy;
  let doStepsSpy: jasmine.Spy;
    
  let worlds: World[];
  let createWorldResponse: WorldResponse;
  let doStepsResponse: WorldResponse;
  
  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(async(() => {
  
    worlds = [
        { id: 1, currentStepId: 1 },
        { id: 5, currentStepId: 30 },
       ] as World[];
    createWorldResponse = { worldId: 2 };
    doStepsResponse = { worldId: 2, message: 'Started calculating next 5 step(s)' };
       
    const reportService = jasmine.createSpyObj('ReportService', ['getWorlds']);
    getWorldsSpy = reportService.getWorlds.and.returnValue(of(worlds));
    
    const bioEvoService = jasmine.createSpyObj('BioEvoService', ['createWorld','doSteps']);
    createWorldSpy = bioEvoService.createWorld.and.returnValue(of(createWorldResponse));
    doStepsSpy = bioEvoService.doSteps.and.returnValue(of(doStepsResponse));
  
    TestBed.configureTestingModule({
      declarations: [ BioevoFrontComponent ],
	    providers:    [
        { provide: ReportService, useValue: reportService },
        { provide: BioEvoService, useValue: bioEvoService }
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));

	it('should create', () => {
	    expect(component).toBeTruthy();
	});
	  
	it('should have <h2> with "Worlds"', () => {
	    const h2 = frontElement.querySelector('h2');
	    expect(h2.textContent).toEqual('Worlds');
	});
  
  it('should query worlds', () => {
    expect(errorMessage()).toBeNull('should not show error');
    expect(getWorldsSpy.calls.any()).toBe(true, 'getWorlds called');    
  });
  
  it('should list worlds', () => {    
    expect(page.worldRows.length).toBe(worlds.length + 1);    
    const worldsList = frontElement.querySelector('.worlds');
    
    const listHeader = page.worldRows[0].textContent;
    expect(listHeader).toContain('ID Current Step', 'list.header');
    
    const firstWorld = page.worldRows[1].textContent;
    expect(firstWorld).toContain(worlds[0].id.toString(), 'world.id');
    expect<any>(firstWorld).toContain(worlds[0].currentStepId, 'world.currentStepId');
    
    const secondWorld = page.worldRows[2].textContent;
    expect(secondWorld).toContain(worlds[1].id.toString(), 'world.id');
    expect<any>(secondWorld).toContain(worlds[1].currentStepId, 'world.currentStepId');
  });
  
  it('should select world on click', fakeAsync(() => {
    const row = page.worldRows[2];
    row.click();
    tick();
    
    expect(component.selectedWorld).toEqual(worlds[1]);
  }));
  
});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(BioevoFrontComponent);
  component = fixture.componentInstance;
  frontElement = fixture.nativeElement;

  // change detection triggers ngOnInit which gets a list of worlds
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the worlds and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  /** Hero line elements */
  worldRows: HTMLLIElement[];

  constructor() {
    const worldRowNodes = frontElement.querySelectorAll('li');
    this.worldRows = Array.from(worldRowNodes);
  };
}
