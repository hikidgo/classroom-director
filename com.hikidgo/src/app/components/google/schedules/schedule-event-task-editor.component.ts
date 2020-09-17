import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';
// import { CardTemplateEditorComponent } from './cardtemplates/card-template-editor.component';
// import { CardTemplateEditorDirective } from './cardtemplates/card-template-editor.directive';

@Component({
  selector: 'app-schedule-event-task-editor',
  templateUrl: './schedule-event-task-editor.component.html',
  styleUrls: ['./schedule-event-task-editor.component.scss'],
  providers: []
})
export class ScheduleEventTaskEditorComponent implements OnInit {
  // private _editor: CardTemplateEditorComponent;


  // @ViewChild(CardTemplateEditorDirective, { static: true }) dirEditor: CardTemplateEditorDirective;


  constructor(
    private _snackBar: MatSnackBar,
    public _dialogRef: MatDialogRef<ScheduleEventTaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public context: ScheduleEventTask) {

  }

  ngOnInit() {
    // this._editor = this.dirEditor.load(this.context.card.templateConfiguration.key);
    // this._editor.context = this.context;
  }

  onRemove() {
    this._dialogRef.close(<ScheduleEventTaskEditorResponse>{
      delete : true,
      update : false
    });
  }

  onOkClick() {
    // const resp = this._editor.commit();
    // if (resp.success) {
    //   this._dialogRef.close(<ScheduleEventTaskEditorResponse>{
    //     update : true,
    //     delete : false,
    //     task : resp.task
    //   });
    // }else{
    //   this._snackBar.open("Form is not valid.");
    // }
  }

  onCancelClick(): void {
    this._dialogRef.close(null);
  }
}

export interface ScheduleEventTaskEditorResponse {
  update : boolean;
  delete : boolean;
  task : ScheduleEventTask;
}

