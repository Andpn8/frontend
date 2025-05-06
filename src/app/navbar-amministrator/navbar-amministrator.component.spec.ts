import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAmministratorComponent } from './navbar-amministrator.component';

describe('NavbarAmministratorComponent', () => {
  let component: NavbarAmministratorComponent;
  let fixture: ComponentFixture<NavbarAmministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAmministratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAmministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
