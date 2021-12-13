import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoriesService} from "../stories.service";
import {NotificationService} from "../../../shared-components/notification-service/notification.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {
  addStoryForm: FormGroup

  constructor(
    private _storiesService: StoriesService,
    @Inject(MAT_DIALOG_DATA) public sessionId: string,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {


    this.addStoryForm = this._formBuilder.group({
      storyName: ['', Validators.required],
      storyDescription: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addStory() {
    this._storiesService.addStory(this.sessionId, this.addStoryForm.value).then((data) => {
      this._notificationService.showSuccess('Story Added', 'success');
    })
  }
}
