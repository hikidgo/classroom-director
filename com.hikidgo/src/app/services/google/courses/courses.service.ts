import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleCourseState, GoogleCourse } from '../data';

@Injectable()
export class GoogleCoursesService {
    private _baseUrl = 'https://classroom.googleapis.com/v1/courses';

    constructor(private http: HttpClient) { }

    getAll(): Observable<GoogleCoursesResponse> {
        return this.getList(<GoogleCoursePagedQueryModel>{
            pageSize: 1000,
            courseStates: [GoogleCourseState.ACTIVE]
        });
    }

    getList(model: GoogleCoursePagedQueryModel): Observable<GoogleCoursesResponse> {
        var url = `${this.getBaseUrl()}`;
        var params = new HttpParams();
        for (let property in model) {
            const propVal = model[property];
            if (propVal != null) {
                if(Array.isArray(propVal)){
                    propVal.forEach(x => {
                        params = params.append(property, x);
                    });
                }else{
                    params = params.append(property, model[property]);
                }
            }
        }
        return this.http.get<GoogleCoursesResponse>(url, { params: params });
    }

    get(uniqueId: string): Observable<GoogleCourse> {
        var url = `${this.getBaseUrl()}/${uniqueId}`;
        return this.http.get<GoogleCourse>(url);
    }

    private getBaseUrl(): string {
        return this._baseUrl;
    }
}

export class GoogleCoursePagedQueryModel{
    pageSize: number = 1000;
    pageToken : string;
    courseStates: GoogleCourseState[];
}

export class GoogleCoursesResponse{
    courses : GoogleCourse[];
    nextPageToken: string;
}