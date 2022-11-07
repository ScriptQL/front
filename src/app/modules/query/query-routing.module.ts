import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QueryListComponent} from "./screens/query-list/query-list.component";
import {QueryDetailsComponent} from "./screens/query-details/query-details.component";
import {QueryCreateComponent} from "./screens/query-create/query-create.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QueryListComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: QueryCreateComponent
  },
  {
    path: ':id',
    component: QueryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule {
}
