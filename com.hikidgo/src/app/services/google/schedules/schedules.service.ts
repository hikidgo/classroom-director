import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { WeeklySchedule, WeeklyScheduleReference } from '../../schedules/schedules.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class GoogleSchedulesService {

    constructor(private http: HttpClient, private settings: AppSettingsService) { }

    update(request: WeeklyScheduleUpdateRequest): Observable<WeeklyScheduleResponse> {
        var url = `https://www.googleapis.com/upload/drive/v3/files`;
        var meta = new GoogleFilesUploadModel();
        var params = new HttpParams();
        for (let property in meta) {
            if (request.schedule[property] != null) {
                params = params.append(property, request.schedule[property]);
            }
        }

        var exists: boolean = true;
        var ref = request.ref;
        var contentType = 'application/json';
        if (ref == null) {
            exists = false;
            const name: string = request.schedule.begin.getTime().toString()+".json";
            ref = new GoogleFileRef();
            ref.name = name;
            ref.mimeType = contentType;
        }
        if(request.schedule.version == null){
            request.schedule.version = 0;
        }
        request.schedule.version += 1;

        const boundary = '-------314159265358979323846264';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var base64Data = btoa(JSON.stringify(request.schedule));
        var body =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(ref) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

        if (exists) {
            return this.http.put<GoogleFileRef>(url, body, { params: params, headers: { "Content-Type": 'multipart/mixed; boundary="' + boundary + '"' } }).pipe(
                map(x => {
                    return <WeeklyScheduleResponse>{
                        schedule: request.schedule,
                        ref: x
                    };
                })
            );
        } else {
            return this.http.post<GoogleFileRef>(url, body, { params: params, headers: { "Content-Type": 'multipart/mixed; boundary="' + boundary + '"' } }).pipe(
                map(x => {
                    return <WeeklyScheduleResponse>{
                        schedule: request.schedule,
                        ref: x
                    };
                })
            );
        }
    }

    get(begin: Date): Observable<WeeklyScheduleResponse> {
        var query = new GoogleFilesPagedQueryModel();
        query.q = `name='${begin.getTime()}.json'`;

        return this.getFiles(query)
            .pipe(
                switchMap(x => {
                    if (x.files.length > 0) {
                        var file = x.files[0];
                        return this.getFile(file)
                            .pipe(
                                map(s => {
                                    return <WeeklyScheduleResponse>{
                                        schedule: s,
                                        ref: file
                                    };
                                })
                            );
                    }
                    else {
                        return of( <WeeklyScheduleResponse>{
                            schedule: new WeeklySchedule(begin),
                            ref: null
                        });
                    }
                })
            );
    }
    
    private getFile(ref: GoogleFileRef): Observable<WeeklySchedule> {
        var url = `https://www.googleapis.com/drive/v3/files/${ref.id}`;
        var params = new HttpParams();
        var model = new GoogleFilesDownloadModel();
        for (let property in model) {
            if (model[property] != null) {
                params = params.append(property, model[property]);
            }
        }
        return this.http.get<WeeklySchedule>(url, { params: params });
    }

    private getFiles(model: GoogleFilesPagedQueryModel): Observable<GoogleFileRefsResponse> {
        var url = `https://content.googleapis.com/drive/v3/files`;
        var params = new HttpParams();
        for (let property in model) {
            if (model[property] != null) {
                params = params.append(property, model[property]);
            }
        }
        return this.http.get<GoogleFileRefsResponse>(url, { params: params });
    }
}

export class GoogleFilesUploadModel {
    uploadType: string = "multipart";
}
export class GoogleFilesDownloadModel {
    //mimeType: string = "application/json";
    alt: string = "media";
}

export class GoogleFilesPagedQueryModel {
    pageSize: number = 1000;
    pageToken: string;
    corpus: string = "user";
    spaces: string = "appDataFolder";
    fields: string = "nextPageToken, files(*)";
    q: string;
}

export class GoogleFileRefsResponse {
    files: GoogleFileRef[];
    nextPageToken: string;
}

export class GoogleFileRef {
    id?: string;
    name: string;
    kind?: string;
    mimeType: string = "application/json";
    parents: string[] = ['appDataFolder'];
    webContentLink?:string;
}

export class GoogleScheduleReferencesResponse {
    schedules: WeeklyScheduleReference[];
}

export class GoogleSchedulesResponse {
    schedules: WeeklySchedule[];
}

export class WeeklyScheduleResponse {
    schedule: WeeklySchedule;
    ref: GoogleFileRef;
}

export class WeeklyScheduleUpdateRequest {
    schedule: WeeklySchedule;
    ref: GoogleFileRef;
}