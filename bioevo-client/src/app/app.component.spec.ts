import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

@Component({selector: 'app-bioevo-front', template: ''})
class BioevoFrontStubComponent {}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        AppComponent,
        BioevoFrontStubComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have as title 'BioEvo Client'`, async(() => {
    expect(comp.title).toEqual('BioEvo');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Welcome to BioEvo!');
  }));
});
