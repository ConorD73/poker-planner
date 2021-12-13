import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSessionComponent} from './create-session/create-session.component';
import {ListMembersComponent} from './members/list-memebers/list-members.component';
import {RouterModule, Routes} from "@angular/router";
import {ViewSessionComponent} from './view-session/view-session.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import { SingleMemberComponent } from './members/single-member/single-member.component';
import { AddStoryComponent } from './stories/add-story/add-story.component';
import { ViewStoriesComponent } from './stories/view-stories/view-stories.component';
import { JoinSessionComponent } from './join-session/join-session.component';
import {SessionService} from "./session.service";
import {SessionGuard} from "../guards/session.guard";
import {SharedComponentsModule} from "../shared-components/shared-components.module";
import { DestorySessionDialogComponent } from './view-session/destory-session-dialog/destory-session-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditStoryComponent } from './stories/edit-story/edit-story.component';



const routes: Routes = [
  {
    path: 'create',
    component: CreateSessionComponent
  },
  {
    path: ':sessionId',
    canActivate: [SessionGuard],
    component: ViewSessionComponent,
    resolve: {
      data: SessionService
    }
  },
  {
    path: ':sessionId/join',
    component: JoinSessionComponent
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
    CreateSessionComponent,
    ListMembersComponent,
    ViewSessionComponent,
    SingleMemberComponent,
    AddStoryComponent,
    ViewStoriesComponent,
    JoinSessionComponent,
    DestorySessionDialogComponent,
    EditStoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
  ]
})
export class SessionModule {
}
