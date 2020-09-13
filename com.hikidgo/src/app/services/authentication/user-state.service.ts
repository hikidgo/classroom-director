import { BehaviorSubject } from 'rxjs';
import { UserManager, User } from 'oidc-client';

export class UserStateService {
    private _initialized: boolean = false;
    public userContext$: BehaviorSubject<UserContext>;

    constructor(
        private _userManager: UserManager
    ) {
        this.userContext$ = new BehaviorSubject<UserContext>(null);
    }

    init() {
        if (this._initialized) {
            return;
        }

        this._initialized = true;
        this._userManager.getUser().then(x => {
            this.setUser(x);
        });
    }

    signinRedirect(redirectUrl: string, lang : string) : Promise<void> {
        return this._userManager.signinRedirect(
            {
              state: redirectUrl,
              ui_locales: lang
            });
    }

    signoutRedirect(lang : string) : Promise<void> {
        return this._userManager.signoutRedirect(
            { 
              ui_locales : lang
            });
    }

    signinRedirectCallback() : Promise<User>{
        return this._userManager.signinRedirectCallback()
        .then(x => {
            this.setAndStoreUser(x);
            return x;
        });
    }

    clear() {
        this.userContext$.next(null);
        this._userManager.removeUser();
    }

    setAndStoreUser(x: User) {
        this._userManager.storeUser(x);
        this.setUser(x);
    }

    getUser(): Promise<User> {
        return this._userManager.getUser();
    }

    private setUser(x: User) {
        if (x == null) {
            return;
        }
        var context = this.createUserContext(x);
        this.userContext$.next(context);
    }

    private createUserContext(x: User): UserContext {
        if (x == null) {
            return null;
        }

        return <UserContext>{
            user: x
        };
    }

    private ensureArray(value): string[] {
        if (!Array.isArray(value)) {
            return [<string>value];
        }
        return value;
    }
}

export class UserContext {
    user: User;
}

