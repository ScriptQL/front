import {Component, Input, OnInit} from '@angular/core';
import {Query} from "../../../../interfaces/query";
import {QueryService} from "../../../../services/query.service";

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss']
})
export class QueryResultComponent implements OnInit {

  @Input()
  query: Query;

  length: string = '0';

  constructor(
    private service: QueryService) {
  }

  ngOnInit(): void {
    this.service.head(this.query).subscribe({
      next: (data) => {
        let length = data.get('Content-Length');
        this.length = length ? length : '0';
      }
    });

  }

}
