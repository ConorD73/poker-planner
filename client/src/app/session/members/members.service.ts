import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../shared-components/notification-service/notification.service";
import {Member} from "./member.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  onMembersChanged: BehaviorSubject<any>;
  member: Member = new Member();
  onMemberChanged: BehaviorSubject<any>;

  /**
   * Members Service
   * @param _httpClient
   * @param _notificationService
   */
  constructor(private _httpClient: HttpClient, private _notificationService: NotificationService) {
    this.onMembersChanged = new BehaviorSubject<any>({});
    this.onMemberChanged = new BehaviorSubject<any>({});
  }


  /**
   * Get Members of a session
   * @param sessionId
   */
  getMembersOfASession(sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.production + '/session/' + sessionId + '/members')
        .subscribe((response: any) => {
          this.members = response;
          this.onMembersChanged.next(this.members);
          resolve(response)
        }, reject)
    });
  }

  /**
   * Get a member of a specific session
   * @param sessionId
   * @param memberId
   */
  getMemberOfSession(sessionId: string, memberId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.production + '/session/' + sessionId + '/members/' + memberId).subscribe((response: any) => {
        this.member = response;
        this.onMemberChanged.next(this.member);
        resolve(response);
      }, reject)
    })
  }

  addMemberToSession(memberInfo: any, sessionId: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.production + '/session/' + sessionId + '/join', memberInfo)
        .subscribe((response: any) => {
          this.members = response;
          resolve(response)
        }, reject)
    });
  }
}
