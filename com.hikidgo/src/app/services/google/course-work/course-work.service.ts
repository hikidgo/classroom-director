import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleCourseWork, GoogleCourseWorkState } from '../data';

@Injectable()
export class GoogleCourseWorkService {
    private _baseUrl = 'https://classroom.googleapis.com/v1/courses';

    constructor(private http: HttpClient) { }

    getAll(courseId : string): Observable<GoogleCourseWorksResponse> {
        return this.getList(courseId, <GoogleCourseWorkPagedQueryModel>{
            pageSize: 1000,
            courseWorkStates: [GoogleCourseWorkState.DRAFT, GoogleCourseWorkState.PUBLISHED]
        });
    }

    getList(courseId : string, model: GoogleCourseWorkPagedQueryModel): Observable<GoogleCourseWorksResponse> {
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
        return this.http.get<GoogleCourseWorksResponse>(url, { params: params });
    }

    get(courseId : string, uniqueId: string): Observable<GoogleCourseWork> {
        var url = `${this.getBaseUrl(courseId)}/${uniqueId}`;
        return this.http.get<GoogleCourseWork>(url);
    }

    private getBaseUrl(courseId : string): string {
        return `${this._baseUrl}/${courseId}/courseWork`;
    }
}

export class GoogleCourseWorkPagedQueryModel{
    orderBy : string = 'dueDate desc';
    pageSize: number = 1000;
    pageToken : string;
    courseWorkStates: GoogleCourseWorkState[];
}

export class GoogleCourseWorksResponse{
    courseWork : GoogleCourseWork[];
    nextPageToken: string;
}
