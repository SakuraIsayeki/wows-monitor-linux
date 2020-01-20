import { Component, Inject, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService, UpdateServiceToken } from 'src/app/interfaces/update.service';
import { BaseComponent } from '../base.component';
import { of, interval } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LoggerServiceToken, LoggerService } from 'src/app/interfaces/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent extends BaseComponent implements OnInit, OnDestroy {

  updating = false;

  get updateProgress() {
    if (this.isBrowser) {
      return of(100);
    } else {
      return this.updateService.$updateProgress;
    }
  }

  constructor(
    private router: Router,
    @Inject(UpdateServiceToken) private updateService: UpdateService
  ) {
    super();
  }

  ngOnInit() {
    if (environment.desktop) {
      this.updateService.$updateAvailable.pipe(this.untilDestroy(), skip(1)).subscribe(available => this.handleUpdate(available));
      this.updateService.checkForUpdate();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  private handleUpdate(available) {
    if (available) {
      this.updating = true;
      this.updateService.quitAndInstall();
    } else {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
