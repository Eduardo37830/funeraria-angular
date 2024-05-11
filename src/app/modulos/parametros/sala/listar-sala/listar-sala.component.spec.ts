import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSalaComponent } from './listar-sala.component';

describe('ListarSalaComponent', () => {
  let component: ListarSalaComponent;
  let fixture: ComponentFixture<ListarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
