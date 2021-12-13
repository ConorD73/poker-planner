import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStorysComponent } from './view-storys.component';

describe('ViewStorysComponent', () => {
  let component: ViewStorysComponent;
  let fixture: ComponentFixture<ViewStorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
