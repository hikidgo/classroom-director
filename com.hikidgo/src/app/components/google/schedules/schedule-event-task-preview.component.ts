import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-schedule-event-task-preview',
  templateUrl: './schedule-event-task-preview.component.html',
  styleUrls: ['./schedule-event-task-preview.component.scss'],
  providers: []
})
export class ScheduleEventTaskPreviewComponent implements OnInit {

  @Input() task: ScheduleEventTask;


  ngOnInit() {
  }

}


