import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DailySchedule, ScheduleEvent } from 'src/app/services/schedules/schedules.service';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleEventEditorComponent, ScheduleEventEditorResponse } from './schedule-event-editor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-google-daily-schedule',
  templateUrl: './google-daily-schedule.component.html',
  styleUrls: ['./google-daily-schedule.component.scss'],
  providers: []
})
export class GoogleDailyScheduleComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  @Input() dayOfWeek: string;
  @Input() schedule: DailySchedule;

  constructor(private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translate: TranslateService) {

  }

  ngOnInit() {
  }

  trackByUniqueId(index: number, item: ScheduleEvent) {
    return item.uniqueId;
  }

  removeEvent(event: ScheduleEvent) {
    var idx = this.schedule.events.indexOf(event, 0);
    if (idx > -1) {
      this.schedule.events.splice(idx, 1);
    }
  }

  onShowAddEventEditor() {
    const copy = <ScheduleEvent>{
      uniqueId: uuidv4(),
      time: 510,
      title: "",
      tasks: [
      ]
    };

    const dialogRef = this._dialog.open(ScheduleEventEditorComponent, {
      data: copy,
      width: '95vw',
      maxWidth: '95vw',
    });

    const sub = dialogRef.afterClosed().subscribe((result: ScheduleEventEditorResponse) => {
      if (result != null) {
        if (result.update) {
          this.schedule.events.push(result.event);
          const ss = this._translate.get('EVENT_ADDED').subscribe(x => {
            this._snackBar.open(`${x}`);
          });
          this._subs.push(ss);
        } 
      }
      this._subs.push(sub);
    });
  }

  onShowEventEditor(event: ScheduleEvent) {
    const copy = <ScheduleEvent>(JSON.parse(JSON.stringify(event)));
    const dialogRef = this._dialog.open(ScheduleEventEditorComponent, {
      data: copy,
      width: '95vw',
      maxWidth: '95vw',
    });

    const sub = dialogRef.afterClosed().subscribe((result: ScheduleEventEditorResponse) => {
      if (result != null) {
        if (result.update) {
          this.removeEvent(event);
          this.schedule.events.push(result.event);
          const ss = this._translate.get('EVENT_UPDATED').subscribe(x => {
            this._snackBar.open(`${x}`);
          });
          this._subs.push(ss);
        } 
        else if (result.delete) {
          this.removeEvent(event);
        }
      }
      this._subs.push(sub);
    });
  }

  ngOnDestroy() {
    this._subs.forEach(x => x.unsubscribe());
  }
}

