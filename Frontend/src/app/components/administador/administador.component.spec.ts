import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministadorComponent } from './administador.component';

describe('AdministadorComponent', () => {
  let component: AdministadorComponent;
  let fixture: ComponentFixture<AdministadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
