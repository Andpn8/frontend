import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementStep2Component } from './new-announcement-step2.component';

describe('NewAnnouncementStep2Component', () => {
  let component: NewAnnouncementStep2Component;
  let fixture: ComponentFixture<NewAnnouncementStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncementStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
