import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { ScheduleEvent, ScheduleEventTask } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-schedule-event-editor',
  templateUrl: './schedule-event-editor.component.html',
  styleUrls: ['./schedule-event-editor.component.scss'],
  providers: []
})
export class ScheduleEventEditorComponent implements OnInit {
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
    this.frm.setValue({title : this.event.title, time : this.event.time});
  }

  trackByUniqueId(index: number, item: ScheduleEventTask) {
    return item.uniqueId;
  }

  timeChanged(change : MatSliderChange){
    this.frm.controls['time'].setValue(change.value);
  }

  onRemove() {
    this._dialogRef.close(<ScheduleEventEditorResponse>{
      delete : true,
      update : false
    });
  }

  onAddTask(){
    
  }

  onOkClick(model: any, isValid: boolean) {
    if (isValid) {
      this.event.title = model.title;
      this.event.time = model.time;
      this._dialogRef.close(<ScheduleEventEditorResponse>{
        update : true,
        delete : false,
        event : this.event
      });
    }
  }

  onCancelClick(): void {
    this._dialogRef.close(null);
  }
}

export interface ScheduleEventEditorResponse {
  update : boolean;
  delete : boolean;
  event : ScheduleEvent;
}

