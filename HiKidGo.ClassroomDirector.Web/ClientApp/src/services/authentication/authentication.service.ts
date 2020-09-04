import { LocalStorageService } from '../io/storage/local-storage.service';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

export class AuthenticationService {
    private _localStorageService: LocalStorageService;
    private _oidc: UserManager;

    constructor(
    ) {
        this._localStorageService = new LocalStorageService();
        this._oidc = new UserManager(<UserManagerSettings>{
            authority: "https://accounts.google.com",
            client_id: "500087856008-ocjf66ods1bv4l231fbu7pcs2hs8avlm.apps.googleusercontent.com",
            redirect_uri: `${window.location.origin}/auth-callback`,
            post_logout_redirect_uri: `${window.location.origin}/logout-callback`,
            response_type: "id_token token",
            scope: `openid email https://www.googleapis.com/auth/classroom.announcements.readonly`
        });
    }

    signIn(): Promise<void> {
        return this._oidc.signinRedirect();
    }

    getToken(): string | null {
        return null;
    }
}
