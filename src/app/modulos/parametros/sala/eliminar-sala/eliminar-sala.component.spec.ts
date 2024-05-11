import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSalaComponent } from './eliminar-sala.component';

describe('EliminarSalaComponent', () => {
  let component: EliminarSalaComponent;
  let fixture: ComponentFixture<EliminarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
