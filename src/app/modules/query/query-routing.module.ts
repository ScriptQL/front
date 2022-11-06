import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QueryListComponent} from "./screens/query-list/query-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QueryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule {
}
