import { NgModule } from '@angular/core';
import { ExternalLinkDirective } from './directives/external-link.directive';
import { IsBrowserDirective } from './directives/is-browser.directive';
import { IsDesktopDirective } from './directives/is-desktop.directive';
import { IsWindowsDirective } from './directives/is-windows.directive';
import { ShowMenuEntryDirective } from './directives/show-menu-entry.directive';
import { ShowOnScrollDirective } from './directives/show-on-scroll.directive';
import { ShowOnDirective } from './directives/show-on.directive';
import { AddPlusPipe } from './pipes/add-plus.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MatchGroupPipe } from './pipes/match-group.pipe';
import { Primetime2RegionPipe } from './pipes/primetime-region.pipe';
import { RegionPipe } from './pipes/region.pipe';
import { ReplaceWhitespacePipe } from './pipes/replace-whitespaces.pipe';
import { ResolveClansPipe } from './pipes/resolve-clans.pipe';
import { RomanPipe } from './pipes/roman.pipe';
import { SanitizeCssPipe } from './pipes/sanitize-css.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { WowsNumbersPipe } from './pipes/wows-numbers.pipe';

@NgModule({
  declarations: [
    IsDesktopDirective,
    IsBrowserDirective,
    IsWindowsDirective,
    ShowMenuEntryDirective,
    ShowOnDirective,
    ExternalLinkDirective,
    ShowOnScrollDirective,
    JoinPipe,
    MatchGroupPipe,
    SanitizeCssPipe,
    SanitizeHtmlPipe,
    RegionPipe,
    ReplaceWhitespacePipe,
    RomanPipe,
    WowsNumbersPipe,
    AddPlusPipe,
    ResolveClansPipe,
    Primetime2RegionPipe
  ],
  exports: [
    IsDesktopDirective,
    IsBrowserDirective,
    IsWindowsDirective,
    ShowMenuEntryDirective,
    ShowOnDirective,
    ExternalLinkDirective,
    ShowOnScrollDirective,
    JoinPipe,
    MatchGroupPipe,
    SanitizeCssPipe,
    SanitizeHtmlPipe,
    RegionPipe,
    ReplaceWhitespacePipe,
    RomanPipe,
    WowsNumbersPipe,
    AddPlusPipe,
    ResolveClansPipe,
    Primetime2RegionPipe
  ],
  imports: [],
  providers: []
})
export class SharedModule { }
