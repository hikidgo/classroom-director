import { Injectable } from '@angular/core';
import { UserStateService } from '../services/authentication/user-state.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserManagerProviderType, UserStateFactory } from '../services/authentication/user-state.factory';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private _userStateFactory: UserStateFactory,
        private _translateService : TranslateService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var userStateService = this._userStateFactory.create(UserManagerProviderType.Google);

        return from(userStateService.getUser())
            .pipe(
                switchMap(user => {
                    var headers = request.headers.set('Accept-Language', this._translateService.currentLang);

                    if(user?.access_token != null){
                        headers = headers.set('Authorization', 'Bearer ' + user.access_token);
                    }
                    
                    const requestClone = request.clone({
                        headers
                    });
                    return next.handle(requestClone)
                        .pipe(
                            catchError(error => {
                                if(error instanceof HttpErrorResponse){
                                    var httpError = <HttpErrorResponse>error;
                                    switch(httpError.status){
                                        case 400://bad request
                                            return this.handle400Error(httpError);
                                        case 401://unauthorized
                                            return this.handle401Error(httpError);
                                        case 403://forbidden
                                            return this.handle403Error(httpError);
                                        case 500:
                                            return this.handle500Error(httpError);
                                    }
                                }
                                return this.handleError(httpError);
                            })
                        );
                })
            );
    }

    handle400Error(resp : HttpErrorResponse) : Observable<never>{
        return throwError(new BadRequestException(resp.error.errors));
    }

    handle401Error(resp : HttpErrorResponse) : Observable<never>{
        return throwError(new UnauthorizedException());
    }

    handle403Error(resp : HttpErrorResponse) : Observable<never>{
        return throwError(new ForbiddenException());
    }

    handle500Error(resp : HttpErrorResponse) : Observable<never>{
        return throwError(new UnexpectedException(resp.error.message));
    }

    handleError(resp : any) : Observable<never>{
        return throwError(new UnexpectedException("UNEXPECTED_ERROR"));
    }
}

export interface Exception{
    getMessage() : string;
}

export class UnexpectedException implements Exception {
    message : string;

    constructor(message : string){
        this.message = message;
    }

    getMessage() : string{
        return this.message;
    }
}

export class UnauthorizedException implements Exception{
    
    getMessage()  : string{
        return "UNAUTHORIZED";
    }

}

export class ForbiddenException implements Exception{
    
    getMessage() : string{
        return "FORBIDDEN";
    }

}

export class BadRequestException implements Exception{
    errors : object;

    constructor(errors : object){
        this.errors = errors;
    }

    getMessage()  : string{
        var messages = [];
        for (let key in this.errors) {
            var values = <string[]>this.errors[key];
            for(let idx in values){
                messages.push(values[idx].trim());
            }
        }
        var text = messages.join('\n');
        return text;
    }

}