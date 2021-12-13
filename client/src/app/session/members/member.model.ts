export class Member {
  id: string;
  name: string;
  role: string;

  constructor(member?: any) {
    member = member || {};
    this.id = member.id || '';
    this.name = member.name || '';
    this.role = member.role || '';
  }
}
