import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarPlanComponent } from './renovar-plan.component';

describe('RenovarPlanComponent', () => {
  let component: RenovarPlanComponent;
  let fixture: ComponentFixture<RenovarPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenovarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
