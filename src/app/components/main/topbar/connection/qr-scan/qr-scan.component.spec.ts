import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScanComponent } from './qr-scan.component';
import { MainModule } from '../../../main.module';

describe('QrScanComponent', () => {
  let component: QrScanComponent;
  let fixture: ComponentFixture<QrScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrScanComponent],
      imports: [MainModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
