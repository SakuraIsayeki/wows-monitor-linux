import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryClanComponent } from './history-clan.component';

describe('HistoryClanComponent', () => {
  let component: HistoryClanComponent;
  let fixture: ComponentFixture<HistoryClanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryClanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
