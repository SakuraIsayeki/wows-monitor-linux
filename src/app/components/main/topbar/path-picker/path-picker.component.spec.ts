import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathPickerComponent } from './path-picker.component';

describe('PathPickerComponent', () => {
  let component: PathPickerComponent;
  let fixture: ComponentFixture<PathPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
