import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Story} from "./story.model";
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  stories: Story[] = [];
  onStoriesChanged: Subject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onStoriesChanged = new Subject<any>();
  }

  /**
   * Gets all stories related to a session using its ID
   * @param sessionId
   */
  getStories(sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.production + '/session/' + sessionId + '/stories').subscribe((response: any) => {
        this.stories = response;
        this.onStoriesChanged.next(this.stories);
        resolve(response);
      }, reject)
    });
  }

  voteOnStory(sessionId: string, memberId: string, storyId: string, vote: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.production + '/stories/' + sessionId + '/vote/' + storyId, {
        vote: vote,
        memberId: memberId
      }).subscribe((response: any) => {
        resolve(response)
      }, reject)
    })
  }

  addStory(sessionId: string, story: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.production + '/session/' + sessionId + '/stories', story)
        .subscribe((response: any) => {
          this.stories.push(response);
          this.onStoriesChanged.next(this.stories);
          resolve(response);
        }, reject)
    })
  }

  updateStory(sessionId: string, storyId: string, story: Story): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.production + '/session/' + sessionId + '/stories/' + storyId, story)
        .subscribe((response: any) => {
          // Remove id of story that has just been updated and push the response to the stores array
          this.stories = this.stories.filter((item: Story) => item.id != storyId)
          this.stories.push(response);
          this.onStoriesChanged.next(this.stories);
          resolve(response)

        }, reject)
    })
  }
}
