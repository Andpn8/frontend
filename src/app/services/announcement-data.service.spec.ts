import { TestBed } from '@angular/core/testing';

import { AnnouncementDataService } from './announcement-data.service';

describe('AnnouncementDataService', () => {
  let service: AnnouncementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
