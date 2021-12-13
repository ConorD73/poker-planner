import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";
import {NotificationService} from "../shared-components/notification-service/notification.service";

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

  constructor(private _notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          // server-side error
          this._notificationService.showFailure(error.status + ' | ' + error.message, 'danger');
          return throwError(error);
        })
      )
  }
}
