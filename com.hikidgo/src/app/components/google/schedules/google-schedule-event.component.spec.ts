/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GoogleScheduleEventComponent } from './google-schedule-event.component';

describe('GoogleScheduleEventComponent', () => {
  let component: GoogleScheduleEventComponent;
  let fixture: ComponentFixture<GoogleScheduleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleScheduleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleScheduleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
