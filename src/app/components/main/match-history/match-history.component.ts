import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { faChevronUp, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { MatchGroup, MatchHistoryExportMode, PatreonTier, Region } from '@generated/models';
import { SelectItem } from '@generated/models/select-item';
import { MatchHistoryService } from '@generated/services/match-history.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '@services/jwt-auth.service';
import { MatchHistoryListService } from '@services/match-history-list.service';
import { ScrollService } from '@services/scroll.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './match-history.component.html'
})
export class MatchHistoryComponent extends BaseComponent {

  faLock = faUserLock;
  faChevronUp = faChevronUp;

  maps = this.route.data.pipe(map(d => d.maps as SelectItem[]));
  ships = this.route.data.pipe(map(d => d.ships as SelectItem[]));

  matchGroups = Object.keys(MatchGroup).map(m => ({ label: m, value: MatchGroup[m] } as SelectItem));
  regions = Object.keys(Region).filter(r => Region[r] != Region.NONE && Number.isNaN(+r)).map(m => ({ label: m, value: Region[m] } as SelectItem));

  get canExport() {
    return this.authService.userInfo.patreonTier == PatreonTier.Tier2;
  }

  downloading = false;

  constructor(private route: ActivatedRoute, public listService: MatchHistoryListService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
              private matchHistoryService: MatchHistoryService,
              private translate: TranslateService,
              public scrollService: ScrollService) {
    super();

  }

  exportItems: MenuItem[] = [{
    label: this.translate.instant('matchHistory.exportJsonZip'),
    command: () => this.export(MatchHistoryExportMode.JsonSeparate)
  }];

  export(exportMode: MatchHistoryExportMode = MatchHistoryExportMode.JsonCompiled) {
    this.downloading = true;
    this.matchHistoryService.matchHistoryExport$Response({ exportMode: exportMode, body: this.listService.form.model })
      .subscribe(x => {
        window['saveAs'](x.body, this.getFileName(x.headers.get('content-disposition')));
      }, error => {
      }, () => this.downloading = false);
  }

  private getFileName(header: string) {
    let filename = '';
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(header);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
    return filename;
  }
}
