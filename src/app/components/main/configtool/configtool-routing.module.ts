import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { ConfigtoolComponent } from './configtool.component';

const routes: StRoutes = [
  {
    path: '',
    component: ConfigtoolComponent,
    data: {
      meta: {
        title: 'meta.configtool.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigtoolRoutingModule { }
