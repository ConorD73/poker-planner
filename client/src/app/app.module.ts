import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NotificationService} from "./shared-components/notification-service/notification.service";
import {SharedComponentsModule} from "./shared-components/shared-components.module";
import { MatDialogModule} from "@angular/material/dialog";
import {GlobalErrorInterceptor} from "./interceptors/global-error.interceptor";

// Main Routes for application
const appRoutes: Routes = [
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  },
  {
    path: '', redirectTo: '/session/create', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/session/create',
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SharedComponentsModule,
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
