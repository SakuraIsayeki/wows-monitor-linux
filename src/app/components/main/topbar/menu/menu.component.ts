import { Component, Input, OnInit } from '@angular/core';
import { faCog, faDesktop, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { MenuEntry } from 'src/app/interfaces/menu-entry';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';
import { combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  @Input()
  closeAction: () => void;

  private $changelogsBadgeSubject = new BehaviorSubject(false);
  private $changelogsBadgeCountSubject = new BehaviorSubject(0);

  menu: MenuEntry[] = [
    {
      key: 'meta.monitor.title',
      routerLink: '/home',
      icon: faDesktop
    },
    {
      key: 'meta.monitor.changelog',
      routerLink: '/changelogs',
      icon: faFileAlt,
      badge: this.$changelogsBadgeSubject,
      badgeCount: this.$changelogsBadgeCountSubject
    },
    {
      key: 'meta.settings.title',
      routerLink: '/home/settings',
      icon: faCog
    } // ,
    // {
    //   key: 'meta.about.title',
    //   routerLink: '/home/about',
    //   icon: faQuestionCircle
    // }
  ];

  constructor(private apiService: ApiService, private config: Config) {
    super();
    combineLatest(
      this.apiService.changelogIds(),
      this.config.$seenChangelogs
    )
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
