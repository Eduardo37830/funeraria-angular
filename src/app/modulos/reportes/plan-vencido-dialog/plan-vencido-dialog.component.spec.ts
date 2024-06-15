import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanVencidoDialogComponent } from './plan-vencido-dialog.component';

describe('PlanVencidoDialogComponent', () => {
  let component: PlanVencidoDialogComponent;
  let fixture: ComponentFixture<PlanVencidoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanVencidoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanVencidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
