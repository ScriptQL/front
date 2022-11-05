import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { ConnectionsComponent } from './connections/connections.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { AddUserComponent } from './usuarios/add-user/add-user.component';


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
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
