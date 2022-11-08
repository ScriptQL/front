import {Component, OnInit} from '@angular/core';
import {DataSourceService} from "../../../../services/data-source.service";
import {Page} from "../../../../interfaces/page";
import {DataSource} from "../../../../interfaces/data-source";
import {PageEvent} from "@angular/material/paginator";
import {EditDataSourceModal} from "../../modals/edit-data-source-modal/edit-data-source-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-data-source-list',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.scss']
})
export class DataSourceListComponent implements OnInit {

  columns: string[] = ['name', 'driver', 'host', 'database', 'more'];
  data: Page<DataSource> = new Page<DataSource>();

  constructor(
    private service: DataSourceService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onPage();
  }

  onPage($event?: PageEvent): void {
    let index;
    if ($event) {
      index = $event.pageIndex + 1;
    } else {
      index = this.data.page;
    }
    this.service.search(index).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onAdd(): void {
    this.dialog.open(EditDataSourceModal, {
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      location.reload();
    });
  }

}
