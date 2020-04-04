import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserEntity } from "@liveo/entities";
import { EndpointService } from "@liveo/services";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  private readonly _currentUserKey = "current-user";

  constructor(
    private readonly _endpointService: EndpointService,
    private readonly _httpClient: HttpClient) {
  }

  public login(username: string, password: string): Promise<UserEntity> {
    const endpoint = this._endpointService.getEndpoint("authentication");
    return this._httpClient
      .post<any>(endpoint, { username, password })
      .pipe(map((user) => {
        if (user) {
          user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem(this._currentUserKey, JSON.stringify(user));
        }

        return user;
      })).toPromise();
  }

  public logout(): void {
    localStorage.removeItem(this._currentUserKey);
  }

  public isUserLoggedIn(): boolean {
    const currentUser = this.getUserAuthData();
    return currentUser && currentUser.authdata;
  }

  public getUserAuthData(): any {
    return JSON.parse(localStorage.getItem(this._currentUserKey));
  }
}
