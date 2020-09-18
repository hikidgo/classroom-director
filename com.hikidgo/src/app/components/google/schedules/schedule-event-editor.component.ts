import { Component, OnInit, Inject, ViewChild, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { ScheduleEvent, ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleEventTaskLoaderComponent } from './tasks/schedule-event-task-loader.component';

@Component({
  selector: 'app-schedule-event-editor',
  templateUrl: './schedule-event-editor.component.html',
  styleUrls: ['./schedule-event-editor.component.scss'],
  providers: []
})
export class ScheduleEventEditorComponent implements OnInit {
  @ViewChild(ScheduleEventTaskLoaderComponent) taskEditors: QueryList<ScheduleEventTaskLoaderComponent>;
  frm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ScheduleEventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public event: ScheduleEvent) {

    this.frm = this._fb.group({
      title: ['',
        [
          <any>Validators.required,
          Validators.maxLength(256)
        ],
      ],
      time: [510,
        [
          <any>Validators.required,
          Validators.min(0),
          Validators.max(1435)
        ]
      ]
    });
  }

  ngOnInit() {
    this.frm.setValue({ title: this.event.title, time: this.event.time });
  }

  trackByUniqueId(index: number, item: ScheduleEventTask) {
    return item.uniqueId;
  }

  timeChanged(change: MatSliderChange) {
    this.frm.controls['time'].setValue(change.value);
  }

  onRemove() {
    this._dialogRef.close(<ScheduleEventEditorResponse>{
      delete: true,
      update: false
    });
  }

  onAddTask(taskType: string) {
    if (taskType != null) {
      const copy = <ScheduleEventTask>{
        uniqueId: uuidv4(),
        title: "**New**",
        key: taskType,
        configuration: JSON.stringify({})
      };

    }
  }

  onRemoveTask(task: ScheduleEventTask) {
    var idx = this.event.tasks.indexOf(task, 0);
    if (idx > -1) {
      this.event.tasks.splice(idx, 1);
    }
  }

  onOkClick(model: any, isValid: boolean) {
    
    var tasks : ScheduleEventTask[] = [];
    if (isValid) {
      this.taskEditors.toArray().forEach(x => {
        var respTask = x.commit();
        if (respTask.success) {
          tasks.push(x.task);
        } else {
          isValid = false;
        }
      });

      this.event.title = model.title;
      this.event.time = model.time;
      this.event.tasks = tasks;
      this._dialogRef.close(<ScheduleEventEditorResponse>{
        update: true,
        delete: false,
        event: this.event
      });
    }
  }

  onCancelClick(): void {
    this._dialogRef.close(null);
  }
}

export interface ScheduleEventEditorResponse {
  update: boolean;
  delete: boolean;
  event: ScheduleEvent;
}

