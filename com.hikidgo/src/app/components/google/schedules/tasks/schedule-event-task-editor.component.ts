import { ScheduleEventTask } from 'src/app/services/schedules/schedules.service';

export interface ScheduleEventTaskEditorComponent {
    task: ScheduleEventTask;

    commit() : ScheduleEventTaskCommitResponse;
}

export interface ScheduleEventTaskCommitResponse{
    success : boolean;
    task : ScheduleEventTask;
}