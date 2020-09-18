import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {ScheduleEventTaskEditorDirective} from './schedule-event-task-editor.directive';
import {ScheduleEventTaskCommitResponse, ScheduleEventTaskEditorComponent} from './schedule-event-task-editor.component';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-schedule-event-task-loader',
  templateUrl: './schedule-event-task-loader.component.html',
  styleUrls: ['./schedule-event-task-loader.component.scss'],
  providers: []
})
export class ScheduleEventTaskLoaderComponent implements OnInit {
  private _editor: ScheduleEventTaskEditorComponent;
  @ViewChild(ScheduleEventTaskEditorDirective, { static: true }) dirEditor: ScheduleEventTaskEditorDirective;

  @Input() task: ScheduleEventTask;

  constructor() {

  }

  ngOnInit() {
    this._editor = this.dirEditor.load(this.task.key);
    this._editor.task = this.task;
  }

  commit() : ScheduleEventTaskCommitResponse {
    return this._editor.commit();
  }
}
