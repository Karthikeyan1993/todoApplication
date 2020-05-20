import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng9LoadingSpinnerComponent } from './ng9-loading-spinner.component';

describe('Ng9LoadingSpinnerComponent', () => {
  let component: Ng9LoadingSpinnerComponent;
  let fixture: ComponentFixture<Ng9LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng9LoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng9LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
