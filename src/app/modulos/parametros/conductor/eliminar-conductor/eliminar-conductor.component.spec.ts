import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarConductorComponent } from './eliminar-conductor.component';

describe('EliminarConductorComponent', () => {
  let component: EliminarConductorComponent;
  let fixture: ComponentFixture<EliminarConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarConductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
