import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCeoComponent } from './navbar-ceo.component';

describe('NavbarCeoComponent', () => {
  let component: NavbarCeoComponent;
  let fixture: ComponentFixture<NavbarCeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
