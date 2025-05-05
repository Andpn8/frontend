import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAmministratorComponent } from './login-amministrator.component';

describe('LoginAmministratorComponent', () => {
  let component: LoginAmministratorComponent;
  let fixture: ComponentFixture<LoginAmministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAmministratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAmministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
