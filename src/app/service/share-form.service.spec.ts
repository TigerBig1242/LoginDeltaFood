import { TestBed } from '@angular/core/testing';

import { ShareFormService } from './share-form.service';

describe('ShareFormService', () => {
  let service: ShareFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
