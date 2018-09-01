import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { commonTestingModules } from '../../testing/common.testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        commonTestingModules
      ],
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have page not found text', () => {
    expect(compiled.querySelector('p').textContent).toContain('This page doesn\'t exist.');
  });

  it('should have link to Home', () => {
    expect(compiled.querySelector('a').textContent).toContain('home');
  });
});
