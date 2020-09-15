import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { DailySchedule } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-google-daily-schedule',
  templateUrl: './google-daily-schedule.component.html',
  styleUrls: ['./google-daily-schedule.component.scss'],
  providers: []
})
export class GoogleDailyScheduleComponent implements OnInit {

  @ViewChild("routeMenu", { static: true, read: ElementRef }) routeMenu: ElementRef;
  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger: MatMenuTrigger;

  @Input() dayOfWeek: string;
  @Input() schedule: DailySchedule;

  constructor(private _dialog: MatDialog) {

  }

  ngOnInit() {
  }

  onShowAddEventEditor() {
    const schedule = this.schedule;
    const c = this;

    // const dialogRef = this._dialog.open(CardRouteEditorComponent, {
    //   data: <CardRouteEditorData>{
    //     allowRemove: false,
    //     allowEdit: true,
    //     routeName: null,
    //     context: ctx
    //   }
    // });

    // const sub = dialogRef.afterClosed().subscribe((result: CardRouteEditResponse) => {
    //   if (result) {
       

    //   }
    //   sub.unsubscribe();
    // });

  }

  // onShowRouteEditor(endpoint, e) {
  //   const ctx = this.context;
  //   const ep = endpoint;

  //   const uuid = endpoint._jsPlumb.uuid;
  //   const routeName = uuid.substring(uuid.indexOf('|') + 1);

  //   const dialogRef = this._dialog.open(CardRouteEditorComponent, {
  //     data: <CardRouteEditorData>{
  //       allowRemove: true,
  //       allowEdit: false,
  //       routeName: routeName,
  //       context: ctx
  //     }
  //   });

  //   const sub = dialogRef.afterClosed().subscribe((result: CardRouteEditResponse) => {
  //     if (result != null && result.delete) {
  //       //delete ctx.card.routes[routeName];
  //     }
  //     sub.unsubscribe();
  //   });
  // }
}

