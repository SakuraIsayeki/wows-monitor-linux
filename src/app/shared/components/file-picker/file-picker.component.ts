import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html'
})
export class FilePickerComponent extends BaseComponent implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  defaultPath: string;

  constructor(@Inject(ElectronServiceToken) @Optional() private electronService: ElectronService) {
    super();
  }

  ngOnInit(): void {
  }

  public async selectPath() {
    const odr = await this.electronService.showOpenDialog({
      defaultPath: this.control.value ?? this.defaultPath,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => this.control.setValue(odr.filePaths[0]));
    }
  }
}
