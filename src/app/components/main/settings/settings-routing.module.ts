import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      meta: {
        title: 'meta.settings.title'
      }
    }
  },
  {
    path: ':goto',
    component: SettingsComponent,
    data: {
      meta: {
        title: 'meta.settings.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
