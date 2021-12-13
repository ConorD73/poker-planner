import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../session.service";
import {NotificationService} from "../../shared-components/notification-service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {

  createSessionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _sessionService: SessionService, private _router: Router, private _notificationService: NotificationService) {
    this.createSessionForm = this._formBuilder.group({
      sessionName: ['', Validators.required],
      deck: ['', Validators.required],
    });
  }


  ngOnInit(): void {
  }

  /**
   * Create new session
   * When a new session is created a session ID and user ID for the first user is returned and set in local storage
   */
  createNewSession(): void {
    if (!this.createSessionForm.valid) {
      this._notificationService.showFailure('Form not correct');
    }
    this._sessionService.createSession(this.createSessionForm.value).then((data: any) => {
      //TODO Move local storage to a service
      localStorage.setItem('user_id', data['id']);
      localStorage.setItem('session_id', data['sessionId']);
      localStorage.setItem('role', data['role']);
      this._router.navigateByUrl('/session/' + data['sessionId']);
    });

  }
}
