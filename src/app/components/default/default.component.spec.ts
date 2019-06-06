import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppProvidersModule, AppImportsModule } from 'src/app/app.module.browser';
import { AppSharedImportsModule } from 'src/app/app.module.shared';
import { DefaultComponent } from './default.component';


describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultComponent],
      imports: [AppProvidersModule, AppImportsModule, AppSharedImportsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
