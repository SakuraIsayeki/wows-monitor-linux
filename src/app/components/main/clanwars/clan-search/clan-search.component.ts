import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ClanWarsHistoryService } from '@services/clanwars-history.service';
import { ClansService } from '@generated/services';
import { BaseComponent } from '@components/base.component';

@Component({
  selector: 'app-clan-search',
  templateUrl: './clan-search.component.html'
})
export class ClanSearchComponent extends BaseComponent implements OnInit, OnDestroy {

  autoCompleteResult: any[];

  selection = null;

  @Input()
  placeholder: string;

  @Output()
  clanSelected = new EventEmitter<number>();

  constructor(
    public cwService: ClanWarsHistoryService,
    private clansService: ClansService
  ) {
    super();
  }

  ngOnInit() {
  }

  autocomplete(event: any) {
    if (event.query && event.query.length > 2) {
      this.clansService.clansAutocomplete({ query: event.query })
        .pipe(this.untilDestroy())
        .subscribe(result => this.autoCompleteResult = result);
    }
  }

  onSelect(event: any) {
    this.clanSelected.emit(event.id);
    this.selection = null;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
