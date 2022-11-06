import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {NavbarComponent} from './navbar/navbar.component';
import {UsersComponent} from './users/users.component';
import {ConnectionsComponent} from './connections/connections.component';
import {SettingsComponent} from './settings/settings.component';
import {HistoryComponent} from './history/history.component';
import {AddUserComponent} from './usuarios/add-user/add-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    UsersComponent,
    ConnectionsComponent,
    SettingsComponent,
    HistoryComponent,
    AddUserComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
