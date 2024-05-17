import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConductorComponent } from './listar-conductor.component';

describe('ListarConductorComponent', () => {
  let component: ListarConductorComponent;
  let fixture: ComponentFixture<ListarConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarConductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
