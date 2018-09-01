import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { commonTestingModules } from '../../../testing/common.testing';
import { WorldResponse } from '../../model/world.response';
import { BioEvoService } from '../../service';
import { AdvanceStepsComponent } from './advance-steps.component';

const worldNdx = 5;

describe('AdvanceStepsComponent', () => {
  let bioEvoService;
  let doStepsSpy: jasmine.Spy;
  let doStepsResponse: WorldResponse;

  let component: AdvanceStepsComponent;
  let fixture: ComponentFixture<AdvanceStepsComponent>;

  beforeEach(async(() => {

    doStepsResponse = { worldId: worldNdx, message: 'Started calculating next 5 step(s)' };
    bioEvoService = jasmine.createSpyObj('BioEvoService', ['doSteps']);
    doStepsSpy = bioEvoService.doSteps.and.returnValue(of(doStepsResponse));

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        commonTestingModules
      ],
      declarations: [ AdvanceStepsComponent ],
      providers:    [
        { provide: BioEvoService, useValue: bioEvoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
