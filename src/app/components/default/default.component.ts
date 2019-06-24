import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService, UpdateServiceToken } from 'src/app/interfaces/update.service';
import { BaseComponent } from '../base.component';
import { of } from 'rxjs';

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
    this.checkForUpdate();
    if (this.isDesktop) {
      this.updateService.$updateAvailable.subscribe(available => this.handleUpdate(available));
    }
  }

  async checkForUpdate() {
    if (this.isBrowser) {
      const available = await this.updateService.checkForUpdate();
      this.handleUpdate(available);
    } else {
      await this.updateService.checkForUpdate();
    }
  }

  private handleUpdate(available) {
    if (available) {
      this.updateService.quitAndInstall();
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
