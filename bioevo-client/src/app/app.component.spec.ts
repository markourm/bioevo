import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { commonTestingModules } from '../testing/common.testing';

import { AppComponent } from './app.component';

@Component({selector: 'app-bioevo-front', template: ''})
class BioevoFrontStubComponent {}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        commonTestingModules
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

  it('should have link to Home in toolbar', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar a span').textContent).toContain('Home');
  }));
});
