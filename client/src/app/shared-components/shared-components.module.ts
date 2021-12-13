import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NotificationServiceComponent} from "./notification-service/notification-service.component";


@NgModule({
  declarations: [
    HeaderComponent,
    NotificationServiceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NotificationServiceComponent
  ]
})
export class SharedComponentsModule { }
