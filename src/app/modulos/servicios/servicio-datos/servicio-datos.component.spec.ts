import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioDatosComponent } from './servicio-datos.component';

describe('ServicioDatosComponent', () => {
  let component: ServicioDatosComponent;
  let fixture: ComponentFixture<ServicioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
