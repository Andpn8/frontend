import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementStep3Component } from './new-announcement-step3.component';

describe('NewAnnouncementStep3Component', () => {
  let component: NewAnnouncementStep3Component;
  let fixture: ComponentFixture<NewAnnouncementStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncementStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
