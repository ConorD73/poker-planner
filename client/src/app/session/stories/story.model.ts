export class Story {
  id: string
  storyName: string
  description: string
  voteCount: string
  status: string

  /**
   * Story constructor
   * @param story
   */
  constructor(story?: any) {
    story = story || {};
    this.id = story.id || '';
    this.storyName = story.story_name || '';
    this.description = story.description || '';
    this.voteCount = story.vote_count || '';
    this.status = story.status || '';
  }
}
