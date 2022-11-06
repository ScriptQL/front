import {NgModule} from '@angular/core';

import {QueryRoutingModule} from './query-routing.module';
import {QueryListComponent} from "./screens/query-list/query-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CreateQueryModal} from './modals/create-query-modal/create-query-modal.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    QueryListComponent,
    CreateQueryModal
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
    ReactiveFormsModule
  ]
})
export class QueryModule {
}
