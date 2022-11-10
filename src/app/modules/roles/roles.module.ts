import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './screens/role-list/role-list.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    RoleListComponent
  ],
  imports: [
    SharedModule,
    RolesRoutingModule,

    // Material
    MatDialogModule
  ]
})
export class RolesModule { }
