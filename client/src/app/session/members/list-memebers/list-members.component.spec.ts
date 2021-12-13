import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemebersComponent } from './list-members.component';

describe('ListMemebersComponent', () => {
  let component: ListMemebersComponent;
  let fixture: ComponentFixture<ListMemebersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMemebersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMemebersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
