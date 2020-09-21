/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LaunchCourseWorkTaskEditorComponent } from './launch-course-work-task-editor.component';

describe('LaunchCourseWorkTaskEditorComponent', () => {
  let component: LaunchCourseWorkTaskEditorComponent;
  let fixture: ComponentFixture<LaunchCourseWorkTaskEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchCourseWorkTaskEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchCourseWorkTaskEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
