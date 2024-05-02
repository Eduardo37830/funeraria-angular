import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionTwofaComponent } from './identificacion-twofa.component';

describe('IdentificacionTwofaComponent', () => {
  let component: IdentificacionTwofaComponent;
  let fixture: ComponentFixture<IdentificacionTwofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificacionTwofaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentificacionTwofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
