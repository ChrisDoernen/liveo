import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private _authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this._authenticationService.getUserAuthData();
    if (currentUser && currentUser.authdata) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser.authdata}`
        }
      });
    }

    return next.handle(request);
  }
}