import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, iif } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    if (request.url.startsWith(ENV.appBaseUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${ENV.basicToken}`
        }
      });
    }
    return next.handle(request);
  }
}
