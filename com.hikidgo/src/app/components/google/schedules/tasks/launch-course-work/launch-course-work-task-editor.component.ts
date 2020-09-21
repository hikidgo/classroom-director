import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';
import { GoogleCoursesService } from 'src/app/services/google/courses/courses.service';
import { GoogleCourseWorkService } from 'src/app/services/google/course-work/course-work.service';
import { GoogleCourseWorkTopicsService } from 'src/app/services/google/course-work-topics/course-work-topics.service';
import { GoogleCourse, GoogleCourseWork, GoogleCourseWorkTopic } from 'src/app/services/google/data';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
import { ScheduleEventTaskEditorComponent, ScheduleEventTaskCommitResponse } from '../schedule-event-task-editor.component'

@Component({
  selector: 'app-launch-course-work-task-editor',
  templateUrl: './launch-course-work-task-editor.component.html',
  styleUrls: ['./launch-course-work-task-editor.component.scss'],
  providers: []
})
export class LaunchCourseWorkTaskEditorComponent implements ScheduleEventTaskEditorComponent, OnInit {
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
    private _googleCoursesService: GoogleCoursesService,
    private _googleCourseWorkService: GoogleCourseWorkService,
    private _googleCourseWorkTopicsService: GoogleCourseWorkTopicsService) {
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
      ],
      courseWorkId: ['',
        [
        ],
      ],
      courseWorkTopicId: ['',
        [
        ],
      ],
      isSpeakDescription: [true,
        [
          <any>Validators.required
        ],
      ]
    });
  }

  ngOnInit() {
    const config = <LaunchCourseWorkTaskConfiguration>JSON.parse(this.task.configuration);

    this.frm.setValue({
      title: this.task.title,
      courseId: config.courseId ?? "",
      courseWorkId: config.courseWorkId ?? "",
      courseWorkTopicId: config.courseWorkTopicId ?? "",
      isSpeakDescription: config.isSpeakDescription != null ? config.isSpeakDescription : true
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
          this.refreshCourseWork();
          this.refreshTopics();
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

  courseChanged(e: MatSelectChange) {
    this.frm.controls['courseWorkId'].setValue('');
    this.frm.controls['courseWorkTopicId'].setValue('');
    this.refreshCourseWork();
    this.refreshTopics();
  }

  courseWorkTopicChanged(e: MatSelectChange) {
    this.filteredCourseWork = this.filteredCourseWorkByTopic();
  }

  toDate(cw: GoogleCourseWork): Date {
    if (cw.dueDate != null && cw.dueTime != null) {
      var dt = new Date(cw.dueDate.year, cw.dueDate.month - 1, cw.dueDate.day,
        cw.dueTime.hours, cw.dueTime.minutes, 0, 0);
      return dt;
    }
    return null;
  }

  filteredCourseWorkByTopic() : GoogleCourseWork[]{
    if(this.courseWork == null){
      return [];
    }
    const courseWorkTopicId = this.frm.controls['courseWorkTopicId'].value;
    return this.courseWork.filter(x => x.topicId == courseWorkTopicId);
  }

  refreshTopics() {
    const courseId = this.frm.controls['courseId'].value;
    if (courseId != null && courseId != '') {
      this.refreshing = true;
      this._googleCourseWorkTopicsService.getAll(courseId)
        .subscribe(
          x => {
            this.refreshing = false;
            this.courseWorkTopics = x.topic;
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
  }

  refreshCourseWork() {
    const courseId = this.frm.controls['courseId'].value;
    if (courseId != null && courseId != '') {
      this.refreshing = true;
      this._googleCourseWorkService.getAll(courseId)
        .subscribe(
          x => {
            this.refreshing = false;
            this.courseWork = x.courseWork;
            this.filteredCourseWork = this.filteredCourseWorkByTopic();
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
  }

  commit(): ScheduleEventTaskCommitResponse {
    var config = <LaunchCourseWorkTaskConfiguration>JSON.parse(this.task.configuration);
    var values = this.frm.value;

    this.frm.markAllAsTouched();

    if (this.frm.valid) {
      this.task.title = values.title;
      config.courseId = values.courseId;
      config.courseWorkId = values.courseWorkId;
      config.courseWorkTopicId = values.courseWorkTopicId;
      config.isSpeakDescription = values.isSpeakDescription;
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

export interface LaunchCourseWorkTaskConfiguration {
  courseId: string;
  courseWorkId: string;
  courseWorkTopicId : string;
  isSpeakDescription: string;
}

