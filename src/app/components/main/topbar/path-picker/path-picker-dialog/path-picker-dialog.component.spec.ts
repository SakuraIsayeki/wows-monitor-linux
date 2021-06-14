import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PathPickerDialogComponent } from './path-picker-dialog.component';

describe('PathPickerDialogComponent', () => {
  let component: PathPickerDialogComponent;
  let fixture: ComponentFixture<PathPickerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PathPickerDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
