import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserEntity } from "@live/entities";
import { EndpointService } from "@live/services";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private readonly _currentUserKey = "current-user";

  constructor(
    private _endpointService: EndpointService,
    private _http: HttpClient) {
  }

  public login(username: string, password: string): Observable<UserEntity> {
    const endpoint = this._endpointService.getEndpoint("authentication");
    return this._http.post<any>(endpoint, { username, password })
      .pipe(map((user) => {
        if (user) {
          user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem(this._currentUserKey, JSON.stringify(user));
        }

        return user;
      }));
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
