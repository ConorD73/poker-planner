import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MembersService} from "../members.service";
import {Member} from "../member.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-single-member',
  templateUrl: './single-member.component.html',
  styleUrls: ['./single-member.component.scss']
})
export class SingleMemberComponent implements OnInit {

  member: Member;

  constructor(private _membersService: MembersService, private _route: ActivatedRoute) {
    this.member = new Member();
  }

  ngOnInit(): void {
    this._membersService.onMemberChanged.subscribe(data => {
      this.member = new Member(data);
    })
  }
}

