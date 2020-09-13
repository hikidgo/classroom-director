import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserManagerProviderType, UserStateFactory } from '../../authentication/user-state.factory';

@Injectable()
export class GoogleGuardedRouteService implements CanActivate {
  constructor(
    private _router: Router,
    private _userStateFactory: UserStateFactory) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var path = state.url;
    var userStateService = this._userStateFactory.create(UserManagerProviderType.Google);

    var userContext = userStateService.userContext$.value;

    if (userContext == null || userContext.user == null) {
      var msg = 'Sorry, you need to be logged in to view this site.';
      this._router.navigate(['/google/auth'], { queryParams: { r: path, m: msg } });
      return Promise.resolve(false);
    }

    return Promise.resolve(true);

  }

}