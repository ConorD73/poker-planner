export class Session {
  sessionId: string;
  sessionName: string;
  deck: number;

  /**
   *
   * @param session
   */
  constructor(session: any) {
    session = session || {};
    this.sessionId = session.id;
    this.sessionName = session.session_name || '';
    this.deck = session.deck || 1;
  }
}
