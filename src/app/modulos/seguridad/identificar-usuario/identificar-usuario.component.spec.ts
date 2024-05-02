import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificarUsuarioComponent } from './identificar-usuario.component';

describe('IdentificarUsuarioComponent', () => {
  let component: IdentificarUsuarioComponent;
  let fixture: ComponentFixture<IdentificarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
