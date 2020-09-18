/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {ScheduleEventTaskLoaderComponent} from './schedule-event-task-loader.component';

describe('ScheduleEventTaskLoaderComponent', () => {
  let component: ScheduleEventTaskLoaderComponent;
  let fixture: ComponentFixture<ScheduleEventTaskLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleEventTaskLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEventTaskLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
