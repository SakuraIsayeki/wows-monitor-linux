import { Component, Input, OnInit } from '@angular/core';
import { faCog, faDesktop, faFileAlt, faQuestionCircle, faWrench } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { MenuEntry } from 'src/app/interfaces/menu-entry';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';
import { combineLatest, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  private $changelogsBadgeSubject = new BehaviorSubject(false);
  private $changelogsBadgeCountSubject = new BehaviorSubject(0);

  @Input()
  closeAction: () => void;

  menu: MenuEntry[] = [
    {
      key: 'meta.monitor.title',
      routerLink: '/home',
      icon: faDesktop
    },
    {
      key: 'meta.configtool.title',
      routerLink: '/home/configtool',
      icon: faWrench
    },
    {
      key: 'meta.changelogs.title',
      routerLink: '/home/changelogs',
      icon: faFileAlt,
      badge: this.$changelogsBadgeSubject,
      badgeCount: this.$changelogsBadgeCountSubject
    },
    {
      key: 'meta.settings.title',
      routerLink: '/home/settings',
      icon: faCog
    },
    {
      key: 'meta.about.title',
      routerLink: '/home/about',
      icon: faQuestionCircle
    }
  ];

  badge = combineLatest([...this.menu.filter(e => e.badge).map(e => e.badge)])
    .pipe(map(arr => {
      return arr.some(b => b)
    }));


  badgeCount = combineLatest([...this.menu.filter(e => e.badgeCount).map(e => e.badgeCount)])
    .pipe(map(arr => {
      return arr.reduce((a, b) => a + b);
    }));

  constructor(private apiService: ApiService, private config: Config) {
    super();
    combineLatest([
      this.apiService.changelogIds(),
      this.config.$seenChangelogs
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

}
