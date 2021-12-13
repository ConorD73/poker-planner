import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Session} from './session.model';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {NotificationService} from "../shared-components/notification-service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  routeParams: any;
  session: Session[] = []
  onSessionChanged: BehaviorSubject<any>;

  /**
   * Session Service
   * @param _httpClient
   */
  constructor(private _httpClient: HttpClient, private _router: Router, private _notificationService: NotificationService) {
    this.onSessionChanged = new BehaviorSubject<any>({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getSession(this.routeParams.sessionId)
      ]).then(
        () => {
          resolve(null);
        },
        reject
      );
    });
  }

  /**
   * Create a session
   * When a session is created an admin user is also created in the API and returned to the frontend
   * @param session
   */
  createSession(session: Session): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.production + '/session', session)
        .subscribe((response: any) => {
          this.session = response;
          this.onSessionChanged.next(this.session);
          this._notificationService.showSuccess('Session created');
          resolve(response);
        }, reject);
    });
  }


  /**
   * Get a specific session
   * @param sessionId
   */
  getSession(sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.production + '/session/' + sessionId).subscribe((response: any) => {
        if (response === null) {
          this._notificationService.showFailure('Session Does not exist', 'danger')
          this._router.navigateByUrl('/session/create');
        }
        this.session = response;

        this.onSessionChanged.next(this.session);
        resolve(response)
      }, reject)
    });
  }

  /**
   * Deletes the session of a given sessionID
   * @param sessionId
   */
  deleteSession(sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(environment.production + '/session/' + sessionId)
        .subscribe((response) => {
          resolve(response)
        }, reject)
    });
  }
}
