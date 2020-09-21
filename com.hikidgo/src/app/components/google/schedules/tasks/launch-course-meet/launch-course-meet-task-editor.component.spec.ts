/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LaunchCourseMeetTaskEditorComponent } from './launch-course-meet-task-editor.component';

describe('LaunchCourseMeetTaskEditorComponent', () => {
  let component: LaunchCourseMeetTaskEditorComponent;
  let fixture: ComponentFixture<LaunchCourseMeetTaskEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchCourseMeetTaskEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchCourseMeetTaskEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
