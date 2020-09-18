import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ScheduleEvent } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-schedule-event-preview',
  templateUrl: './schedule-event-preview.component.html',
  styleUrls: ['./schedule-event-preview.component.scss'],
  providers: []
})
export class ScheduleEventPreviewComponent implements OnInit {

  @Input() event: ScheduleEvent;


  ngOnInit() {
  }

}


