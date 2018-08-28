import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { commonTestingModules } from '../../../testing/common.testing';
import { ReportService, BioEvoService } from '../../service';

import { World } from '../../model/world';
import { WorldResponse } from '../../model/world.response';
import { WorldComponent } from './world.component';

let fixture: ComponentFixture<WorldComponent>;
let component: WorldComponent;
let frontElement: HTMLElement;
let page: Page;

describe('WorldComponent', () => {

  let reportService;
  let bioEvoService;

  let getWorldSpy: jasmine.Spy;
  let doStepsSpy: jasmine.Spy;

  let world: World;
  let doStepsResponse: WorldResponse;

  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(async(() => {

    world = { id: 5, currentStepId: 1 };

    doStepsResponse = { worldId: 2, message: 'Started calculating next 5 step(s)' };

    reportService = jasmine.createSpyObj('ReportService', ['getWorld']);
    getWorldSpy = reportService.getWorld.and.returnValue(of(world));

    bioEvoService = jasmine.createSpyObj('BioEvoService', ['createWorld', 'doSteps']);
    doStepsSpy = bioEvoService.doSteps.and.returnValue(of(doStepsResponse));
  }));

  describe('WorldComponent normal flow', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          commonTestingModules
        ],
        declarations: [ WorldComponent ],
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

  });

});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(WorldComponent);
  component = fixture.componentInstance;
  frontElement = fixture.nativeElement;

  // change detection triggers ngOnInit which gets a list of worlds
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    updatePage();
  });
}

function updatePage() {
  fixture.detectChanges();
  page = new Page();
}

class Page {

  worldHeader: HTMLElement;
  worldContent: HTMLElement;
  backButton: HTMLElement;

  constructor() {
    this.worldHeader = frontElement.querySelector('.world-details-header');
    this.worldContent = frontElement.querySelector('.world-details-content');
    this.backButton = frontElement.querySelector('.world-details-world-list-button');
  }

}
