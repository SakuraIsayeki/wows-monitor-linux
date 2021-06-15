import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { MonitorComponent } from './monitor.component';

const routes: StRoutes = [
  {
    path: '',
    component: MonitorComponent,
    data: {
      meta: {
        title: 'meta.monitor.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {
}
