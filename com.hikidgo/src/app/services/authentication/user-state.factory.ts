import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { UserStateService } from './user-state.service';

@Injectable()
export class UserStateFactory {
    private _google : UserStateService;

    constructor(appSettingsService: AppSettingsService) {
        var umGoogle = new UserManager(appSettingsService.get().googleAuthentication);
        this._google = new UserStateService(umGoogle);
    }

    create(type: UserManagerProviderType) : UserStateService {
        switch (type) {
            case UserManagerProviderType.Google:
                return this._google;
        }
    }
}

export enum UserManagerProviderType {
    Google
}
