import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementRecapComponent } from './new-announcement-recap.component';

describe('NewAnnouncementRecapComponent', () => {
  let component: NewAnnouncementRecapComponent;
  let fixture: ComponentFixture<NewAnnouncementRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncementRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
