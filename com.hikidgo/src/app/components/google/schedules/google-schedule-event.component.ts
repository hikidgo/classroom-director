import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ScheduleEvent } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-google-schedule-event',
  templateUrl: './google-schedule-event.component.html',
  styleUrls: ['./google-schedule-event.component.scss'],
  providers: []
})
export class GoogleScheduleEventComponent implements OnInit {

  @ViewChild("routeMenu", { static: true, read: ElementRef }) routeMenu: ElementRef;
  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger: MatMenuTrigger;

  @Input() event: ScheduleEvent;

  constructor(private _dialog: MatDialog) {

  }

  ngOnInit() {
  }

}

