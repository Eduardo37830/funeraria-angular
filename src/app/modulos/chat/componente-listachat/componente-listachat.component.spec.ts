import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListachatComponent } from './componente-listachat.component';

describe('ComponenteListachatComponent', () => {
  let component: ComponenteListachatComponent;
  let fixture: ComponentFixture<ComponenteListachatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteListachatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteListachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
