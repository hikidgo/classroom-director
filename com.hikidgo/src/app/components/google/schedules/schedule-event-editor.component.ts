import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleEvent } from 'src/app/services/schedules/schedules.service';

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
        ]
      });
  }

  ngOnInit() {
    this.frm.setValue({title : this.event.title});
  }

  onRemove() {
    this._dialogRef.close(<ScheduleEventEditorResponse>{
      delete : true,
      update : false
    });
  }

  onOkClick(model: any, isValid: boolean) {
    if (isValid) {
      this.event.title = model.title;
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

