import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QrComponent } from './qr.component';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
