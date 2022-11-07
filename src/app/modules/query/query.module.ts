import {NgModule} from '@angular/core';

import {QueryRoutingModule} from './query-routing.module';
import {QueryListComponent} from "./screens/query-list/query-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {QueryDetailsComponent} from './screens/query-details/query-details.component';
import {QueryCreateComponent} from './screens/query-create/query-create.component';
import {MatDividerModule} from "@angular/material/divider";
import {AddReviewerRoleModal} from './modals/add-reviewer-role-modal/add-reviewer-role-modal.component';
import { ConfirmModal } from './modals/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    QueryListComponent,
    QueryDetailsComponent,
    QueryCreateComponent,
    AddReviewerRoleModal,
    ConfirmModal
  ],
  imports: [
    SharedModule,
    QueryRoutingModule,

    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class QueryModule {
}
