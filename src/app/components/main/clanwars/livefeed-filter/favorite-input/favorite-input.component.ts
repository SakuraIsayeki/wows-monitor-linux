import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { ClanSearchResult } from '@generated/models/clan-search-result';

@Component({
  selector: 'app-favorite-input',
  templateUrl: './favorite-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteInputComponent extends BaseComponent implements OnInit {

  @Input()
  control: FormControl;

  array = [];

  constructor(public cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.array = this.control.value;
  }

  clanSelected(id: number) {
    if (!this.array.includes(id)) {
      this.array.push(id);
      this.control.setValue([...this.array], { emitEvent: true });
      this.array = [...this.array];
      this.cd.markForCheck();
    }
  }

  clanRemoved(id: number) {
    if (this.array.includes(id)) {
      const index = this.array.indexOf(id);
      this.array.splice(index, 1);
      this.control.setValue([...this.array], { emitEvent: true });
      this.array = [...this.array];
      this.cd.markForCheck();
    }
  }
}
