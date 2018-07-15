import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';

import { AppComponent } from './app.component';

@Component({selector: 'app-bioevo-front', template: ''})
class BioevoFrontStubComponent {}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  
  it(`should have as title 'bioevo-client'`, async(() => {
    expect(comp.title).toEqual('bioevo-client');
  }));
  
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to bioevo-client!');
  }));
});
