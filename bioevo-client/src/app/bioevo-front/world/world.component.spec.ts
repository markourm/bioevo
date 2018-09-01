import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { commonTestingModules } from '../../../testing/common.testing';
import { ReportService, BioEvoService } from '../../service';

import { World } from '../../model/world';
import { WorldResponse } from '../../model/world.response';
import { WorldComponent } from './world.component';
import { AdvanceStepsComponent } from '../advance-steps/advance-steps.component';

let fixture: ComponentFixture<WorldComponent>;
let component: WorldComponent;
let frontElement: HTMLElement;
let page: Page;

const worldNdx = 5;

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

    world = { id: worldNdx, currentStepId: 1 };
    doStepsResponse = { worldId: worldNdx, message: 'Started calculating next 5 step(s)' };

    reportService = jasmine.createSpyObj('ReportService', ['getWorld']);
    getWorldSpy = reportService.getWorld.and.returnValue(of(world));

    bioEvoService = jasmine.createSpyObj('BioEvoService', ['createWorld', 'doSteps']);
    doStepsSpy = bioEvoService.doSteps.and.returnValue(of(doStepsResponse));
  }));

  describe('WorldComponent normal flow', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          commonTestingModules
        ],
        declarations: [ WorldComponent, AdvanceStepsComponent ],
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

    it('should have World ID in title', () => {
      expect(page.worldHeader.textContent).toContain('World ' + worldNdx);
    });

    it('should have World details', () => {
      const content = page.worldContent.textContent;
      expect(content).toContain('Loaded world with ID ' + worldNdx + ' and Current Step ID 1.');
    });

    it('should have button to advance World', () => {
      expect(page.advanceButton.textContent).toContain('Advance a step');
    });

    it('should have button back to World list', () => {
      expect(page.backButton.textContent).toContain('Back to worlds list');
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
  advanceButton: HTMLElement;
  backButton: HTMLElement;

  constructor() {
    this.worldHeader = frontElement.querySelector('.world-details-header');
    this.worldContent = frontElement.querySelector('.world-details-content');
    this.advanceButton = frontElement.querySelector('.world-details-step-button');
    this.backButton = frontElement.querySelector('.world-details-world-list-button');
  }

}
