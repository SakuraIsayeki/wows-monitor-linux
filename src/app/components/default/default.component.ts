import { Component, Inject, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService, UpdateServiceToken } from '@interfaces/update.service';
import { BaseComponent } from '../base.component';
import { of, interval } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LoggerServiceToken, LoggerService } from '@interfaces/logger.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent extends BaseComponent implements OnInit, OnDestroy {

  updating = false;

  get updateProgress() {
    if (this.isBrowserApp) {
      return of(100);
    } else {
      return this.updateService.$updateProgress;
    }
  }

  constructor(
    @Inject(UpdateServiceToken) private updateService: UpdateService
  ) {
    super();
  }

  ngOnInit() {
    if (environment.desktop) {
      this.updateService.$updateAvailable.pipe(this.untilDestroy(), skip(1)).subscribe(available => this.handleUpdate(available));
      this.updateService.checkForUpdate();
    } else {
      let { redirUrl } = window.history.state;
      redirUrl = redirUrl?.length <= 1 ? null : redirUrl;
      this.router.navigateByUrl(redirUrl || '/home');
    }
  }

  private handleUpdate(available) {
    if (available) {
      this.ngZone.run(() => {
        this.updating = true;
      });
      setTimeout(() => this.updateService.quitAndInstall(), 2000);
    } else {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
