import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../../app-settings/app-settings.service';

@Injectable()
export class GoogleClassroomsService {
    private _baseUrl = 'https://classroom.googleapis.com/v1/courses';

    constructor(private http: HttpClient, private settings: AppSettingsService) { }

    getAll(): Observable<GoogleCoursesResponse> {
        return this.getList(<GoogleCoursePagedQueryModel>{
            pageSize: 1000
        });
    }

    getList(model: GoogleCoursePagedQueryModel): Observable<GoogleCoursesResponse> {
        var url = `${this.getBaseUrl()}`;
        var params = new HttpParams();
        for (let property in model) {
            if (model[property] != null) {
                params = params.append(property, model[property]);
            }
        }
        return this.http.get<GoogleCoursesResponse>(url, { params: params });
    }

    get(uniqueId: string): Observable<GoogleCourse> {
        var url = `${this.getBaseUrl()}/${uniqueId}`;
        return this.http.get<GoogleCourse>(url);
    }

    private getBaseUrl(): string {
        return this.settings.get().baseApiUrl + this._baseUrl;
    }
}

export class GoogleCoursePagedQueryModel{
    pageSize: number = 1000;
    pageToken : string;
    courseStates: GoogleCourseState = GoogleCourseState.ACTIVE;
}

export class GoogleCoursesResponse{
    courses : GoogleCourse[];
    nextPageToken: string;
}

export class GoogleCourse {
    id: string;
    name: string;
    section: string;
    descriptionHeading: string;
    description: string;
    room: string;
    ownerId: string;
    creationTime: string;
    updateTime: string;
    enrollmentCode: string;
    courseState: GoogleCourseState;
    alternateLink: string;
    teacherGroupEmail: string;
    courseGroupEmail: string;
    teacherFolder: GoogleDriveFolder;
    courseMaterialSets: GoogleCourseMaterialSet[];
    guardiansEnabled: boolean;
    calendarId: string;
}

export class GoogleDriveFolder{

}

export class GoogleCourseMaterialSet{

}

export enum GoogleCourseState {
    COURSE_STATE_UNSPECIFIED = 'COURSE_STATE_UNSPECIFIED', //	No course state. No returned Course message will use this value.
    ACTIVE = 'ACTIVE',//The course is active.
    ARCHIVED = 'ARCHIVED',//The course has been archived. You cannot modify it except to change it to a different state.
    PROVISIONED = 'PROVISIONED',//The course has been created, but not yet activated. It is accessible by the primary teacher and domain administrators, who may modify it or change it to the ACTIVE or DECLINED states. A course may only be changed to PROVISIONED if it is in the DECLINED state.
    DECLINED = 'DECLINED',//The course has been created, but declined. It is accessible by the course owner and domain administrators, though it will not be displayed in the web UI. You cannot modify the course except to change it to the PROVISIONED state. A course may only be changed to DECLINED if it is in the PROVISIONED state.
    SUSPENDED = 'SUSPENDED'//The course has been suspended. You cannot modify the course, and only the user identified by the ownerId can view the course. A course may be placed in this state if it potentially violates the Terms of Service.
}