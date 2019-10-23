import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFollowComponent } from './request-follow.component';

describe('RequestFollowComponent', () => {
  let component: RequestFollowComponent;
  let fixture: ComponentFixture<RequestFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
