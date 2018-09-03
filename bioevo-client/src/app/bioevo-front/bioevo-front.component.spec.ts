import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { commonTestingModules } from '../../testing/common.testing';

import { World } from '../model/world';
import { WorldResponse } from '../model/world.response';
import { ReportService, BioEvoService } from '../service';
import { BioevoFrontComponent } from './bioevo-front.component';

let fixture: ComponentFixture<BioevoFrontComponent>;
let component: BioevoFrontComponent;
let frontElement: HTMLElement;
let page: Page;

describe('BioevoFrontComponent', () => {

  let reportService;
  let bioEvoService;

  let getWorldsSpy: jasmine.Spy;
  let createWorldSpy: jasmine.Spy;

  let worlds: World[];
  let createWorldResponse: WorldResponse;

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

      reportService = jasmine.createSpyObj('ReportService', ['getWorlds']);
      getWorldsSpy = reportService.getWorlds.and.returnValue(of(worlds));

      bioEvoService = jasmine.createSpyObj('BioEvoService', ['createWorld', 'doSteps']);
      createWorldSpy = bioEvoService.createWorld.and.returnValue(of(createWorldResponse));
  }));

  describe('BioevoFrontComponent normal flow', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          commonTestingModules
        ],
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

    it('should have title with "Worlds"', () => {
        const h2 = frontElement.querySelector('.mat-title');
        expect(h2.textContent).toEqual('Worlds');
    });

    it('should query worlds', () => {
      expect(errorMessage()).toBeNull('should not show error');
      expect(getWorldsSpy.calls.any()).toBe(true, 'getWorlds() called');
    });

    it('should list worlds', () => {
      expect(page.worldRows.length).toBe(worlds.length);

      const listHeader = page.worldHeader.textContent;
      expect(listHeader).toContain('ID', 'list.header');
      expect(listHeader).toContain('Current Step', 'list.header');
      expect(listHeader).toContain('Details', 'list.header');

      const firstWorld = page.worldRows[0].textContent;
      expect(firstWorld).toContain(worlds[0].id.toString(), 'world.id');
      expect<any>(firstWorld).toContain(worlds[0].currentStepId, 'world.currentStepId');

      const secondWorld = page.worldRows[1].textContent;
      expect(secondWorld).toContain(worlds[1].id.toString(), 'world.id');
      expect<any>(secondWorld).toContain(worlds[1].currentStepId, 'world.currentStepId');
    });

    it('should select world on click', fakeAsync(() => {
      const row = page.worldRows[1];
      row.click();

      updatePage();

      expect(component.selectedWorldId).toEqual(worlds[1].id);
    }));

    it('should add new world', fakeAsync(() => {
      const initialRowCount = worlds.length;
      page.createButton.click();

      updatePage();

      expect(component.worlds.length).toBe(initialRowCount + 1);
      expect(page.worldRows.length).toBe(initialRowCount + 1);

      const newRowId = initialRowCount;
      const id = page.textContent(newRowId, '.world-id');
      const currentStep = page.textContent(newRowId, '.current-step');

      expect(id).toEqual(createWorldResponse.worldId.toString(), 'world.id');
      expect(currentStep).toEqual('1', 'world.currentStepId');
    }));

    it('should have link to World Detailed View', () => {
      const viewButton = page.worldRows[0].querySelector('button');
      expect(viewButton.textContent).toEqual('View');
    });
  });

  describe('BioevoFrontComponent error handling', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          commonTestingModules
        ],
        declarations: [ BioevoFrontComponent ],
        providers:    [
          { provide: ReportService, useValue: reportService },
          { provide: BioEvoService, useValue: bioEvoService }
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(BioevoFrontComponent);
    }));

    it('should display error message', fakeAsync(() => {
      const message = 'getWorlds failed: some message';
      const error = throwError(new Error(message));

      getWorldsSpy = reportService.getWorlds.and.returnValue(error);

      updatePage();

      expect(getWorldsSpy.calls.any()).toBe(true, 'getWorlds called');
      expect(errorMessage()).toEqual(message);
    }));

  });

});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(BioevoFrontComponent);
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
  worldRows: HTMLElement[];
  createButton: HTMLElement;

  constructor() {
    const worldRowNodes = frontElement.querySelectorAll('.mat-row') as NodeListOf<HTMLElement>;
    this.worldRows = Array.from(worldRowNodes);

    const worldHeaderNode = frontElement.querySelectorAll('.mat-header-row') as NodeListOf<HTMLElement>;
    this.worldHeader = worldHeaderNode.item(0);

    this.createButton = frontElement.querySelector('.create-world-button');
  }

  textContent(rowId: number, selector: string) {
    return this.worldRows[rowId].querySelector(selector).textContent.trim();
  }
}
