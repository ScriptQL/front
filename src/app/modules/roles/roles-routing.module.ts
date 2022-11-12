import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleListComponent} from "./screens/role-list/role-list.component";
import { RoleDetailsComponent } from './screens/role-details/role-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RoleListComponent
  },
  {
    path: ':id',
    component: RoleDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {
}
