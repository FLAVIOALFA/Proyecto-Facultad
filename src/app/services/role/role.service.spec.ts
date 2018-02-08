import { TestBed, inject } from '@angular/core/testing';

import { Role.ServiceService } from './role.service.service';

describe('Role.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Role.ServiceService]
    });
  });

  it('should be created', inject([Role.ServiceService], (service: Role.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
