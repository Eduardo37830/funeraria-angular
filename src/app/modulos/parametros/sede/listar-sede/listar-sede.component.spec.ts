import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSedeComponent } from './listar-sede.component';

describe('ListarSedeComponent', () => {
  let component: ListarSedeComponent;
  let fixture: ComponentFixture<ListarSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
