import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataSourceListComponent} from "./screens/data-source-list/data-source-list.component";
import {DataSourceDetailsComponent} from "./screens/data-source-details/data-source-details.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DataSourceListComponent
  },
  {
    path: ':id',
    component: DataSourceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule {
}
