import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { commonTestingModules } from '../../../testing/common.testing';
import { WorldResponse } from '../../model/world.response';
import { BioEvoService } from '../../service';
import { AdvanceStepsComponent } from './advance-steps.component';

let fixture: ComponentFixture<AdvanceStepsComponent>;
let component: AdvanceStepsComponent;
let frontElement: HTMLElement;
let page: Page;

const worldNdx = 5;

describe('AdvanceStepsComponent', () => {
  let bioEvoService;
  let doStepsSpy: jasmine.Spy;
  let doStepsResponse: WorldResponse;
  const doStepsResponseMessage = 'Started calculating next 5 step(s)';

  beforeEach(async(() => {

    doStepsResponse = { worldId: worldNdx, message: doStepsResponseMessage };
    bioEvoService = jasmine.createSpyObj('BioEvoService', ['doSteps']);
    doStepsSpy = bioEvoService.doSteps.and.returnValue(of(doStepsResponse));

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        commonTestingModules
      ],
      declarations: [ AdvanceStepsComponent ],
      providers:    [
        { provide: BioEvoService, useValue: bioEvoService }
      ]
    })
    .compileComponents().then(createComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not permit negative steps', () => {
    const stepsInput = component.stepsForm.controls['steps'];
    stepsInput.setValue('-1');

    fixture.detectChanges();

    expect(stepsInput.errors['min']).toBeTruthy();
    expect(component.stepsForm.valid).toBeFalsy();
    expect(page.advanceButton.disabled).toBeTruthy();
  });

  it('should not permit zero steps', () => {
    const stepsInput = component.stepsForm.controls['steps'];
    stepsInput.setValue('0');

    fixture.detectChanges();

    expect(stepsInput.errors['min']).toBeTruthy();
    expect(component.stepsForm.valid).toBeFalsy();
    expect(page.advanceButton.disabled).toBeTruthy();
  });

  it('should enforce max steps limit', () => {
    const stepsInput = component.stepsForm.controls['steps'];
    stepsInput.setValue('501');

    fixture.detectChanges();

    expect(stepsInput.errors['max']).toBeTruthy();
    expect(component.stepsForm.valid).toBeFalsy();
    expect(page.advanceButton.disabled).toBeTruthy();
  });

  it('should enforce steps value to be mandatory', () => {
    const stepsInput = component.stepsForm.controls['steps'];
    stepsInput.setValue('');

    fixture.detectChanges();

    expect(stepsInput.errors['required']).toBeTruthy();
    expect(component.stepsForm.valid).toBeFalsy();
    expect(page.advanceButton.disabled).toBeTruthy();
  });

  it('should advance world', () => {
    const stepsInput = component.stepsForm.controls['steps'];
    stepsInput.setValue('500');

    fixture.detectChanges();

    expect(component.stepsForm.valid).toBeTruthy();
    expect(page.advanceButton.disabled).toBeFalsy();

    page.advanceButton.click();
    updatePage();

    expect(doStepsSpy.calls.any()).toBe(true, 'doSteps() called');
    expect(page.message.textContent).toContain(doStepsResponseMessage);
  });
});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(AdvanceStepsComponent);
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

  advanceButton: HTMLButtonElement;
  message: HTMLElement;

  constructor() {
    this.advanceButton = frontElement.querySelector('.advance-world-button');
    this.message = frontElement.querySelector('.advance-steps-message');
  }

}
