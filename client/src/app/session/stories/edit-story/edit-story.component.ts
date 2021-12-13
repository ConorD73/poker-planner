import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoriesService} from "../stories.service";
import {NotificationService} from "../../../shared-components/notification-service/notification.service";
import {storyStatus} from '../story-status';
import {Story} from "../story.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  editStoryForm: FormGroup;
  storyStatus: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { story: Story, sessionId: string }, private _notificationService: NotificationService, private _formBuilder: FormBuilder, private _storiesService: StoriesService) {
    this.editStoryForm = this._formBuilder.group({
      storyName: ['', Validators.required],
      storyDescription: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.storyStatus = storyStatus;
  }

  ngOnInit(): void {
    this.editStoryForm.patchValue({
      storyName: this.data.story.storyName,
      storyDescription: this.data.story.description,
      status: this.data.story.status
    });
  }

  editStory() {
    const sessionId = localStorage.getItem('session_id') as string;
    if (!this.editStoryForm.valid) {
      this._notificationService.showFailure('Form is not valid', 'danger');
    } else {
      this._storiesService.updateStory(this.data.sessionId, this.data.story.id, this.editStoryForm.value);
    }
  }

}
