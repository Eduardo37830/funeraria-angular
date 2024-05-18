import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasUsuarioComponent } from './guias-usuario.component';

describe('GuiasUsuarioComponent', () => {
  let component: GuiasUsuarioComponent;
  let fixture: ComponentFixture<GuiasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiasUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuiasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
