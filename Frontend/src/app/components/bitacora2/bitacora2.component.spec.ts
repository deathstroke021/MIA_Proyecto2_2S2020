import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bitacora2Component } from './bitacora2.component';

describe('Bitacora2Component', () => {
  let component: Bitacora2Component;
  let fixture: ComponentFixture<Bitacora2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bitacora2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bitacora2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
