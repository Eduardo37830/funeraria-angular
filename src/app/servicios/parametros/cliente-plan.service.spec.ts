import { TestBed } from '@angular/core/testing';

import { ClientePlanService } from './cliente-plan.service';

describe('ClientePlanService', () => {
  let service: ClientePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
