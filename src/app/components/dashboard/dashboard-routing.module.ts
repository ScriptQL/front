import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './usuarios/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: UsersComponent},
    { path: 'users', component: UsersComponent},
    { path: 'connections', component: ConnectionsComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'addUser', component: AddUserComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
