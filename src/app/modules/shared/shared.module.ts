import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {RouterModule} from "@angular/router";
import {TruncatePipe} from './pipes/truncate.pipe';
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {MarkdownModule} from "ngx-markdown";
import { SnowflakeTimePipe } from './pipes/snowflake-time.pipe';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { DataSourceSelectComponent } from './components/data-source-select/data-source-select.component';
import { RoleSelectComponent } from './components/role-select/role-select.component';
import { MultipleRoleSelectComponent } from './components/multiple-role-select/multiple-role-select.component';

@NgModule({
  declarations: [
    UserDetailsComponent,
    TruncatePipe,
    SnowflakeTimePipe,
    UnixTimePipe,
    DataSourceSelectComponent,
    RoleSelectComponent,
    MultipleRoleSelectComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Dependencies
    HighlightModule,
    MarkdownModule.forRoot(),

    // Material
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Dependencies
    HighlightModule,
    MarkdownModule,

    // Material
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    UserDetailsComponent,
    TruncatePipe,
    SnowflakeTimePipe,
    DataSourceSelectComponent,
    RoleSelectComponent,
    MultipleRoleSelectComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          sql: () => import('highlight.js/lib/languages/sql')
        }
      }
    }
  ]
})
export class SharedModule {
}
