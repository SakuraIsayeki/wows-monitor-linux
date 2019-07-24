import { Component, Inject, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService, UpdateServiceToken } from 'src/app/interfaces/update.service';
import { BaseComponent } from '../base.component';
import { of, interval } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent extends BaseComponent implements OnInit, OnDestroy {

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
    this.updateService.$updateAvailable.pipe(this.untilDestroy(), skip(1)).subscribe(available => this.handleUpdate(available));
    this.checkForUpdate();
  }

  checkForUpdate() {
    if (this.isBrowser) {
      interval(2000).pipe(this.untilDestroy()).subscribe(() => this.handleUpdate(false));
    }
    this.updateService.checkForUpdate();
  }

  private handleUpdate(available) {
    if (available) {
      this.updateService.quitAndInstall();
    } else {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
