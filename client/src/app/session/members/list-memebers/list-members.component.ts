import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MembersService} from "../members.service";
import {ActivatedRoute} from "@angular/router";
import {Member} from "../member.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DestorySessionDialogComponent} from "../../view-session/destory-session-dialog/destory-session-dialog.component";
import {SingleMemberComponent} from "../single-member/single-member.component";

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})
export class ListMembersComponent implements OnChanges {

  @Input() sessionId: string = '';
  members: Member[] = [];

  // Private
  private _unsubscribeAll: Subject<any>

  constructor(private _membersService: MembersService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();

  }

  getMembersOfASession() {
    this._membersService.getMembersOfASession(this.sessionId);
    // Subscribe to the onChange Behaviour subject to get members result
    this._membersService.onMembersChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: Member[]) => {
        this.members = [];
        // Iterate over members
        Array.from(response).forEach(data => {
          // Add new member to array
          this.members.push(new Member(data))
        });
      })
  }

  openSingleMemberComponent(memberId: string) {
    this._membersService.getMemberOfSession(this.sessionId, memberId).then();
    this._dialog.open(SingleMemberComponent);

  }

  // Use change detection hook to update the session ID value if it changes from the input
  ngOnChanges(changes: any) {
    this.getMembersOfASession();
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
