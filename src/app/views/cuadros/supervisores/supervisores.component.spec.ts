import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisoresComponent } from './supervisores.component';

describe('SupervisoresComponent', () => {
  let component: SupervisoresComponent;
  let fixture: ComponentFixture<SupervisoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisoresComponent]
    });
    fixture = TestBed.createComponent(SupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
