import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {StoriesService} from "../stories.service";
import {Story} from "../story.model";
import { takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddStoryComponent} from "../add-story/add-story.component";
import {EditStoryComponent} from "../edit-story/edit-story.component";

@Component({
  selector: 'app-view-stories',
  templateUrl: './view-stories.component.html',
  styleUrls: ['./view-stories.component.scss']
})
export class ViewStoriesComponent implements OnDestroy, OnChanges {
  stories: Story[] = [];
  @Input() sessionId: string = '';

  // Private
  private _unsubscribeAll: Subject<any>

  constructor(private _storiesService: StoriesService, private _dialog: MatDialog) {
    this.stories = [];
    this._unsubscribeAll = new Subject();

  }

  getStories() {
    if (this.sessionId != '') {
      this._storiesService.getStories(this.sessionId);
      this._storiesService.onStoriesChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((stories: Story[]) => {
            this.stories = [];
            Array.from(stories).forEach((data) => {
              this.stories.push(new Story(data));
            })
          }
        )
    }
  }

  /**
   * Opens edit story component and passes story id
   * @param story
   */
  openEditStoryComponent(story: Story) {
    this._dialog.open(EditStoryComponent, {
      data: {story: story, sessionId: this.sessionId}
    });
  }

  /***
   * Opens component to add story
   */
  openAddStoryComponent() {
    this._dialog.open(AddStoryComponent, {
      data: this.sessionId
    });
  }

  // Use change detection hook to update the session ID value if it changes from the input
  ngOnChanges(changes: any) {
    this.getStories();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
