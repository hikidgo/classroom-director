import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeakTaskConfiguration } from 'src/app/services/google/run/tasks/speak/speak-task-runner.service';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
import { ScheduleEventTaskEditorComponent, ScheduleEventTaskCommitResponse } from '../schedule-event-task-editor.component'

@Component({
  selector: 'app-speak-task-editor',
  templateUrl: './speak-task-editor.component.html',
  styleUrls: ['./speak-task-editor.component.scss'],
  providers: []
})
export class SpeakTaskEditorComponent implements ScheduleEventTaskEditorComponent, OnInit {
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
      text: ['',
        [
          <any>Validators.required,
          Validators.maxLength(40000)
        ],
      ]
    });
  }

  ngOnInit() {
    const config = <SpeakTaskConfiguration>JSON.parse(this.task.configuration);

    this.frm.setValue({
      title: this.task.title ?? "",
      text: config.text ?? ""
    });
  }

  commit(): ScheduleEventTaskCommitResponse {
    var config = <SpeakTaskConfiguration>JSON.parse(this.task.configuration);
    var values = this.frm.value;

    this.frm.markAllAsTouched();

    if (this.frm.valid) {
      this.task.title = values.title;
      config.text = values.text;
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

