import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteChatComponent } from './componente-chat.component';

describe('ComponenteChatComponent', () => {
  let component: ComponenteChatComponent;
  let fixture: ComponentFixture<ComponenteChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
