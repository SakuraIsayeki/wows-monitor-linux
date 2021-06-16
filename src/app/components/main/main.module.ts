import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LOADING_BAR_CONFIG, LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AnalyticsInfoComponent } from './analytics-info/analytics-info.component';
import { ChangelogModule } from './changelogs/changelog/changelog.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ConnectionComponent } from './topbar/connection/connection.component';
import { QrScanComponent } from './topbar/connection/qr-scan/qr-scan.component';
import { QrComponent } from './topbar/connection/qr/qr.component';
import { MenuComponent } from './topbar/menu/menu.component';
import { PathPickerDialogComponent } from './topbar/path-picker/path-picker-dialog/path-picker-dialog.component';
import { PathPickerComponent } from './topbar/path-picker/path-picker.component';
import { StatusComponent } from './topbar/status/status.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    MainComponent,
    TopbarComponent,
    MenuComponent,
    PathPickerComponent,
    ConnectionComponent,
    StatusComponent,
    TitlebarComponent,
    QrComponent,
    QrScanComponent,
    PathPickerDialogComponent,
    AnalyticsInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    TranslateModule,
    FontAwesomeModule,
    ChangelogModule,
    SidebarModule,
    TooltipModule,
    InputTextModule,
    OverlayPanelModule,
    ButtonModule,
    DropdownModule,
    DynamicDialogModule,
    DialogModule,
    ScrollPanelModule,
    ZXingScannerModule,
    ScrollPanelModule,
    ToastModule,
    LoadingBarModule,
    InputSwitchModule,
    ReactiveFormsModule
  ],
  providers: [
    DialogService,
    [{ provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }]
  ],
  entryComponents: [
    QrComponent,
    QrScanComponent,
    PathPickerDialogComponent,
    AnalyticsInfoComponent
  ]
})
export class MainModule {
}
