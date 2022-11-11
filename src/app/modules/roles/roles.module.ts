import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './screens/role-list/role-list.component';
import { NgModule } from '@angular/core';
import { EditRoleModal } from './modals/edit-role-modal/edit-role-modal.component';



@NgModule({
  declarations: [
    RoleListComponent,
    EditRoleModal
  ],
  imports: [
    SharedModule,
    RolesRoutingModule,

    // Material
    MatDialogModule
  ]
})
export class RolesModule { }
