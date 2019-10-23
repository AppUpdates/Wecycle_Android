import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNotifyComponent } from './profile-notify.component';

describe('ProfileNotifyComponent', () => {
  let component: ProfileNotifyComponent;
  let fixture: ComponentFixture<ProfileNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
