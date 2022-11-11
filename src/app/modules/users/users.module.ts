import { EditUserModal } from './modals/edit-user-modal/edit-user-modal.component';
import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './screens/user-list/user-list.component';
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    UserListComponent,
    EditUserModal
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,

    // Material
    MatDialogModule
  ]
})
export class UsersModule {
}
