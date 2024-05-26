import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarClientePlanComponent } from './eliminar-cliente-plan.component';

describe('EliminarClientePlanComponent', () => {
  let component: EliminarClientePlanComponent;
  let fixture: ComponentFixture<EliminarClientePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarClientePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarClientePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
