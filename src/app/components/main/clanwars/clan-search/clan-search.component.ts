import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsService } from 'src/app/services/clanwars.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clan-search',
  templateUrl: './clan-search.component.html'
})
export class ClanSearchComponent extends BaseComponent implements OnInit, OnDestroy {

  autoCompleteResult: any[];

  selection = null;

  @Output()
  clanSelected = new EventEmitter<number>();

  constructor(
    public cwService: ClanWarsService,
    private apiService: ApiService
  ) {
    super();
  }

  ngOnInit() {
  }

  autocomplete(event: any) {
    if (event.query && event.query.length > 2) {
      this.apiService.clansAutocomplete(event.query)
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
