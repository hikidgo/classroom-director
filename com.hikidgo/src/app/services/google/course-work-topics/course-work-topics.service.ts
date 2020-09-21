import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleCourseWorkTopic } from '../data';

@Injectable()
export class GoogleCourseWorkTopicsService {
    private _baseUrl = 'https://classroom.googleapis.com/v1/courses';

    constructor(private http: HttpClient) { }

    getAll(courseId : string): Observable<GoogleCourseWorkTopicsResponse> {
        return this.getList(courseId, <GoogleCourseWorkTopicsPagedQueryModel>{
            pageSize: 1000
        });
    }

    getList(courseId : string, model: GoogleCourseWorkTopicsPagedQueryModel): Observable<GoogleCourseWorkTopicsResponse> {
        var url = `${this.getBaseUrl(courseId)}`;
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
        return this.http.get<GoogleCourseWorkTopicsResponse>(url, { params: params });
    }

    get(courseId : string, uniqueId: string): Observable<GoogleCourseWorkTopic> {
        var url = `${this.getBaseUrl(courseId)}/${uniqueId}`;
        return this.http.get<GoogleCourseWorkTopic>(url);
    }

    private getBaseUrl(courseId : string): string {
        return `${this._baseUrl}/${courseId}/topics`;
    }
}

export class GoogleCourseWorkTopicsPagedQueryModel{
    orderBy : string = 'dueDate desc';
    pageSize: number = 1000;
    pageToken : string;
}

export class GoogleCourseWorkTopicsResponse{
    topic : GoogleCourseWorkTopic[];
    nextPageToken: string;
}
