import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { WeeklySchedule } from '../../schedules/schedules.service';

@Injectable()
export class GoogleSchedulesService {
    private _baseUrl = 'https://classroom.googleapis.com/v1/courses';

    constructor(private http: HttpClient, private settings: AppSettingsService) { }

    getList(): Observable<GoogleSchedulesResponse> {
        var url = `${this.getBaseUrl()}`;
        return this.http.get<GoogleSchedulesResponse>(url);
    }

    get(date : Date): Observable<WeeklySchedule> {
        // var url = `${this.getBaseUrl()}/${uniqueId}`;
        // return this.http.get<GoogleCourse>(url);
        return null;
    }

    private getBaseUrl(): string {
        return this.settings.get().baseApiUrl + this._baseUrl;
    }
}

export class GoogleSchedulesResponse{
    schedules : WeeklySchedule[];
}