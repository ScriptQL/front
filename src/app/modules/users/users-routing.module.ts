import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./screens/user-list/user-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
