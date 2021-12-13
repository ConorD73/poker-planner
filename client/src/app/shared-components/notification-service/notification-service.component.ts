import {Component, OnInit} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';
import { Subscription} from 'rxjs';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-notification-service',
  templateUrl: './notification-service.component.html',
  styleUrls: ['./notification-service.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({bottom: '-100px', transform: 'translate(-50%, 0%) scale(0.3)'}),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translate(-50%, 0%) scale(1)',
          opacity: 1,
          bottom: '20px'
        })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translate(-50%, 0%) scale(0.3)',
          opacity: 0,
          bottom: '-100px'
        }))
      ])
    ])
  ]
})
export class NotificationServiceComponent implements OnInit {


  public show = false;
  public message = 'This is snackbar';
  public type = 'success';
  private snackbarSubscription: Subscription;

  /**
   * Notifications Constructor
   * @param snackbarService
   */

  constructor(private snackbarService: NotificationService) {
    this.snackbarSubscription = new Subscription
  }


  ngOnInit(): void {
    this.snackbarSubscription = this.snackbarService.snackbarState
      .subscribe(
        (state) => {
          if (state.type) {
            this.type = state.type;
          } else {
            this.type = 'success';
          }
          this.message = state.message;
          this.show = state.show;
          setTimeout(() => {
            this.show = false;
          }, 3000);
        });
  }
}
