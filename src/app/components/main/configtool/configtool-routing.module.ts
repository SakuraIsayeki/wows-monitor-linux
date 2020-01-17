import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigtoolComponent } from './configtool.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigtoolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigtoolRoutingModule { }
