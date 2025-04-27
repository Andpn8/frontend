import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementSummaryComponent } from './announcement-summary.component';

describe('AnnouncementSummaryComponent', () => {
  let component: AnnouncementSummaryComponent;
  let fixture: ComponentFixture<AnnouncementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
