import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { SettingsComponent } from './settings.component';

const routes: StRoutes = [
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
export class SettingsRoutingModule {
}
