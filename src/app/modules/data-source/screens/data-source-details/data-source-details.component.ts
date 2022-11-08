import {Component, OnInit} from '@angular/core';
import {mergeMap, Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DataSourceService} from "../../../../services/data-source.service";
import {DataSource} from "../../../../interfaces/data-source";
import {MatDialog} from "@angular/material/dialog";
import {Page} from "../../../../interfaces/page";
import {PageEvent} from "@angular/material/paginator";
import {QueryService} from "../../../../services/query.service";
import {Query} from "../../../../interfaces/query";
import {EditDataSourceModal} from "../../modals/edit-data-source-modal/edit-data-source-modal.component";

@Component({
  selector: 'app-data-source-details',
  templateUrl: './data-source-details.component.html',
  styleUrls: ['./data-source-details.component.scss']
})
export class DataSourceDetailsComponent implements OnInit {

  data$: Observable<DataSource>;

  constructor(
    private route: ActivatedRoute,
    private service: DataSourceService,
    private queries: QueryService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(mergeMap(url => {
      const id = url.get('id');
      return this.service.findById(id).pipe(tap(ds => this.onPage(ds)));
    }));
  }

  columns: string[] = ['title', 'requester', 'status', 'more'];
  page: Page<Query> = new Page<Query>();

  onPage(ds: DataSource, $event?: PageEvent): void {
    let index;
    if ($event) {
      index = $event.pageIndex + 1;
    } else {
      index = this.page.page;
    }
    this.queries.search(index, {
      connection: ds.id
    }).subscribe({
      next: (data) => {
        this.page = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onEdit(data: DataSource): void {
    this.dialog.open(EditDataSourceModal, {
      data: data,
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      location.reload();
    });
  }

}
