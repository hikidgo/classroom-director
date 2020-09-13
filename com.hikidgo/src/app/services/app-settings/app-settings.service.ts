import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class AppSettingsService {

    async init(): Promise<AppSettingsConfiguration> {
        var appsettings = new AppSettingsConfiguration();
        var response = await fetch('appsettings.json');
        if (response.status == 200) {
            var lazyLoadedEnvironment = <AppSettingsConfiguration>(await response.json());

            this.mergeDeep(appsettings, lazyLoadedEnvironment);
        }
        else {
            throw "appsettings.json couldn't be loaded."
        }

        window.appsettings = appsettings;

        return appsettings;
    }

    get(): AppSettingsConfiguration {
        return window.appsettings;
    }

    private mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }

    private isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
}

export class AppSettingsConfiguration {
    production: boolean = false;
    baseApiUrl: string = '';
    googleAuthentication: AppSettingsAuthenticationConfiguration = <AppSettingsAuthenticationConfiguration>{
        authority : "https://accounts.google.com",
        client_id : "500087856008-ocjf66ods1bv4l231fbu7pcs2hs8avlm.apps.googleusercontent.com",
        redirect_uri : `${window.location.origin}/google/auth-callback`,
        post_logout_redirect_uri: `${window.location.origin}/google/logout-callback`,
        response_type: "id_token token",
        scope: `openid email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly`,
    };
}

export class AppSettingsAuthenticationConfiguration {
    authority: string;
    client_id: string;
    redirect_uri: string;
    post_logout_redirect_uri: string;
    response_type: string;
    scope: string;

}
