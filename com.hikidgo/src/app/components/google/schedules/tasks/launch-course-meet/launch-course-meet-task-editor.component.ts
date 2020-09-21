import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';
import { GoogleCoursesService } from 'src/app/services/google/courses/courses.service';
import { GoogleCourse, GoogleCourseWork, GoogleCourseWorkTopic } from 'src/app/services/google/data';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
import { ScheduleEventTaskEditorComponent, ScheduleEventTaskCommitResponse } from '../schedule-event-task-editor.component'

@Component({
  selector: 'app-launch-course-meet-task-editor',
  templateUrl: './launch-course-meet-task-editor.component.html',
  styleUrls: ['./launch-course-meet-task-editor.component.scss'],
  providers: []
})
export class LaunchCourseMeetTaskEditorComponent implements ScheduleEventTaskEditorComponent, OnInit {
  frm: FormGroup;

  exception: Exception;
  refreshing: boolean = false;

  courses: GoogleCourse[];
  courseWorkTopics: GoogleCourseWorkTopic[];
  courseWork: GoogleCourseWork[];
  filteredCourseWork : GoogleCourseWork[];

  @Input() task: ScheduleEventTask;

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _googleCoursesService: GoogleCoursesService) {
    this.frm = this._fb.group({
      title: ['',
        [
          <any>Validators.required,
          Validators.maxLength(255)
        ],
      ],
      courseId: ['',
        [
          <any>Validators.required
        ],
      ]
    });
  }

  ngOnInit() {
    const config = <LaunchCourseMeetTaskConfiguration>JSON.parse(this.task.configuration);

    this.frm.setValue({
      title: this.task.title,
      courseId: config.courseId ?? ""
    });

    this.refreshCourses();
  }

  refreshCourses() {
    this.refreshing = true;
    this.exception = null;
    this._googleCoursesService.getAll()
      .subscribe(
        x => {
          this.refreshing = false;
          this.courses = x.courses;
        },
        ex => {
          this.exception = ex;
          this.refreshing = false;
          if (ex instanceof UnauthorizedException) {
            this._router.navigate(['/auth'], { queryParams: { r: this._router.url, m: "Sorry, you need to authenticate again." } });
          }
        }
      );
  }

  commit(): ScheduleEventTaskCommitResponse {
    var config = <LaunchCourseMeetTaskConfiguration>JSON.parse(this.task.configuration);
    var values = this.frm.value;

    this.frm.markAllAsTouched();

    if (this.frm.valid) {
      this.task.title = values.title;
      config.courseId = values.courseId;
      this.task.configuration = JSON.stringify(config);
      return <ScheduleEventTaskCommitResponse>{
        success: true,
        task: this.task
      };
    }

    return <ScheduleEventTaskCommitResponse>{
      success: false,
      task: null
    };
  }

}

export interface LaunchCourseMeetTaskConfiguration {
  courseId: string;
}

