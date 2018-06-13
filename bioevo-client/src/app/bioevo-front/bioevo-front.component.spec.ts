import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BioevoFrontComponent } from './bioevo-front.component';

describe('BioevoFrontComponent', () => {
  let component: BioevoFrontComponent;
  let fixture: ComponentFixture<BioevoFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioevoFrontComponent ],
	  imports: [
	    HttpClientModule
	  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioevoFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
