import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementStep4Component } from './new-announcement-step4.component';

describe('NewAnnouncementStep4Component', () => {
  let component: NewAnnouncementStep4Component;
  let fixture: ComponentFixture<NewAnnouncementStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncementStep4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
