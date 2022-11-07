import {Component, OnInit} from '@angular/core';
import {QueryService} from "../../../../services/query.service";
import {Query} from "../../../../interfaces/query";
import {Page} from "../../../../interfaces/page";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {

  columns: string[] = ['status', 'requester', 'title', 'description', 'connection', 'more'];
  data: Page<Query> = new Page<Query>();

  constructor(
    private service: QueryService) {
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

}
