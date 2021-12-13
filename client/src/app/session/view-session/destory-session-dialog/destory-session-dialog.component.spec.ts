import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestorySessionDialogComponent } from './destory-session-dialog.component';

describe('DestorySessionDialogComponent', () => {
  let component: DestorySessionDialogComponent;
  let fixture: ComponentFixture<DestorySessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestorySessionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestorySessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
