import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
import { ScheduleEventTaskEditorComponent, ScheduleEventTaskCommitResponse } from '../schedule-event-task-editor.component'

@Component({
  selector: 'app-launch-url-task-editor',
  templateUrl: './launch-url-task-editor.component.html',
  styleUrls: ['./launch-url-task-editor.component.scss'],
  providers: []
})
export class LaunchUrlTaskEditorComponent implements ScheduleEventTaskEditorComponent, OnInit {
  frm: FormGroup;

  @Input() task: ScheduleEventTask;

  constructor(private _fb: FormBuilder) {
    this.frm = this._fb.group({
      title: ['',
        [
          <any>Validators.required,
          Validators.maxLength(255)
        ],
      ],
      url: ['',
        [
          <any>Validators.required,
          Validators.maxLength(2083)
        ],
      ]
    });
  }

  ngOnInit() {
    const config = <LaunchUrlTaskConfiguration>JSON.parse(this.task.configuration);

    this.frm.setValue({
      title: this.task.title,
      url: config.url
    });
  }

  commit(): ScheduleEventTaskCommitResponse {
    var config = <LaunchUrlTaskConfiguration>JSON.parse(this.task.configuration);
    var values = this.frm.value;

    this.frm.markAllAsTouched();

    if (this.frm.valid) {
      this.task.title = values.title;
      config.url = values.url;
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

export interface LaunchUrlTaskConfiguration {
  url: string;
}

