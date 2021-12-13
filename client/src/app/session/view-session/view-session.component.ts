import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../session.service";
import {MembersService} from "../members/members.service";
import {Session} from "../session.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NotificationService} from "../../shared-components/notification-service/notification.service";
import {environment} from "../../../environments/environment";
import {DestorySessionDialogComponent} from "./destory-session-dialog/destory-session-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.scss']
})
export class ViewSessionComponent implements OnInit, OnDestroy {
  currentSession: Session;
  joinLink: string = '';
  isAdmin: boolean = false;

  // Private
  private _unsubscribeAll: Subject<any>

  constructor(private _sessionService: SessionService,
              private _membersService: MembersService,
              private _dialog: MatDialog,
              private _router: Router,
              private _notificationService: NotificationService) {
    this.currentSession = new Session({});
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (localStorage.getItem('role') != null) {
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        this.isAdmin = true;
      }
    }
    this._sessionService.onSessionChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((session: Session) => {
        // Current session is set with the session id provided in route params
        this.currentSession = new Session(session);

        // Join link is generated
        this.joinLink = 'http://localhost:4200/session/' + this.currentSession.sessionId + '/join';
      });
  }

  openDestroySessionDialog() {
    const dialogRef = this._dialog.open(DestorySessionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSession(this.currentSession.sessionId);
      }
    });
  }


  /**
   * Deletes A session and removes it's members
   */
  deleteSession(sessionId: string) {
    // Session is deleted and members are removed
    if (this.isAdmin) {
      this._sessionService.deleteSession(sessionId).then(data => {
        this._notificationService.showSuccess('Session Deleted');
        this._router.navigateByUrl('/session/create');
      })
    } else {
      this._notificationService.showFailure('You are not an admin', 'danger');
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
