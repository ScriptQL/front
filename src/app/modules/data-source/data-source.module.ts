import {NgModule} from '@angular/core';

import {DataSourceRoutingModule} from './data-source-routing.module';
import {DataSourceListComponent} from './screens/data-source-list/data-source-list.component';
import {SharedModule} from "../shared/shared.module";
import { DataSourceDetailsComponent } from './screens/data-source-details/data-source-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditDataSourceModal } from './modals/edit-data-source-modal/edit-data-source-modal.component';


@NgModule({
  declarations: [
    DataSourceListComponent,
    DataSourceDetailsComponent,
    EditDataSourceModal
  ],
  imports: [
    SharedModule,
    DataSourceRoutingModule,

    // Material
    MatDialogModule,
  ]
})
export class DataSourceModule {
}
