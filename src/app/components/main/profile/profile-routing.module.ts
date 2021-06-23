import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from '@components/main/profile/profile.resolver';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  resolve: {
    profile: ProfileResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    meta: {
      title: 'meta.profile.title'
    }
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
