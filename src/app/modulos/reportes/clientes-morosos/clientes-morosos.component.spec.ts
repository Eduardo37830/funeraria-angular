import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMorososComponent } from './clientes-morosos.component';

describe('ClientesMorososComponent', () => {
  let component: ClientesMorososComponent;
  let fixture: ComponentFixture<ClientesMorososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesMorososComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
