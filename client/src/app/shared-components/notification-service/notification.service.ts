import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {

    private snackbarSubject = new Subject<any>();
    public snackbarState = this.snackbarSubject.asObservable();

    constructor() {
    }

    showSuccess(message: string, type?: string): void {
        this.snackbarSubject.next({
            show: true,
            message,
            type
        });
    }

    showFailure(message: string, type?: string): void {
        this.snackbarSubject.next({
            show: true,
            message,
            type
        });
    }
}
