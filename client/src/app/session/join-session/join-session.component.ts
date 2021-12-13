import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersService} from "../members/members.service";
import {NotificationService} from "../../shared-components/notification-service/notification.service";

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {

  joinSessionForm: FormGroup;
  sessionId: string | null = '';

  constructor(
    private _memberService: MembersService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _notificationService: NotificationService,
    private _route: ActivatedRoute) {
    this.joinSessionForm = this._formBuilder.group({
      sessionId: ['', Validators.required],
      username: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(data => {
      this.sessionId = data.get('sessionId');
    })
  }

  /**
   * Add User to Session
   */
  addUserToSession() {
    this.joinSessionForm.patchValue({sessionId: this.sessionId})
    this._memberService.addMemberToSession(this.joinSessionForm.value, this.sessionId).then((data) => {
      if (data != null) {
        localStorage.setItem('session_id', data['session_id']);
        localStorage.setItem('user_id', data['id']);
        localStorage.setItem('role', data['role']);
        this._router.navigateByUrl('/session/' + this.sessionId);
      } else {
        this._notificationService.showFailure('There was an error on the backend', 'danger');
      }
    })
  }
}
