import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faCog, faDesktop, faFileAlt, faQuestionCircle, faShieldAlt, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Region } from '@generated/models/region';
import { ChangelogService } from '@generated/services';
import { MenuEntry } from '@interfaces/menu-entry';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  private $changelogsBadgeSubject = new BehaviorSubject(false);
  private $changelogsBadgeCountSubject = new BehaviorSubject(0);
  public selectingRegion = false;

  @Input()
  closeAction: () => void;

  menu: MenuEntry[] = [
    {
      key: 'meta.monitor.title',
      routerLink: '/',
      icon: faDesktop
    },
    {
      key: 'meta.configtool.title',
      routerLink: '/configtool',
      icon: faWrench,
      browser: false,
      desktop: true
    },
    {
      key: 'meta.livefeed.title',
      routerLink: '/clanwars/livefeed',
      icon: faShieldAlt
    },
    {
      key: 'meta.clanwars.title',
      routerLink: '/clanwars',
      icon: faShieldAlt
    },
    {
      key: 'meta.changelogs.title',
      routerLink: '/changelogs',
      icon: faFileAlt,
      badge: this.$changelogsBadgeSubject,
      badgeCount: this.$changelogsBadgeCountSubject
    },
    {
      key: 'meta.settings.title',
      routerLink: '/settings',
      icon: faCog
    },
    {
      key: 'meta.about.title',
      routerLink: '/about',
      icon: faQuestionCircle
    }
  ];

  badge = combineLatest([...this.menu.filter(e => e.badge).map(e => e.badge)])
    .pipe(map(arr => {
      return arr.some(b => b);
    }));


  badgeCount = combineLatest([...this.menu.filter(e => e.badgeCount).map(e => e.badgeCount)])
    .pipe(map(arr => {
      return arr.reduce((a, b) => a + b);
    }));

  userMenu = [
    {
      label: 'File',
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil'
    }
  ];

  constructor(private changelogService: ChangelogService,
              private settingsService: SettingsService,
              @Inject(AUTHSERVICETOKEN) public auth: JwtAuthService,
              private renderer: Renderer2) {
    super();
    combineLatest([
      this.changelogService.changelogIds(this.settingsService.form.monitorConfig.allowBeta.model ? { channel: 'beta' } : null),
      this.settingsService.form.seenChangelogs.valueChanges
    ])
      .pipe(this.untilDestroy())
      .subscribe(arr => {
        if (arr[0] != null && arr[1] != null) {
          this.$changelogsBadgeSubject.next(arr[0].length > arr[1].length);
          this.$changelogsBadgeCountSubject.next(arr[0].length - arr[1].length);
        }
      });
  }

  ngOnInit() {
  }

  async login(event: MouseEvent, region: Region) {
    event.stopPropagation();
    event.cancelBubble = true;
    this.selectingRegion = false;
    this.auth.login({ renderer: this.renderer, region }).subscribe();
  }
}
