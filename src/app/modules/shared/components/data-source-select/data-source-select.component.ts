import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../../interfaces/page";
import {DataSource} from "../../../../interfaces/data-source";
import {DataSourceService} from "../../../../services/data-source.service";

@Component({
  selector: 'shared-data-source-select',
  templateUrl: './data-source-select.component.html',
  styleUrls: ['./data-source-select.component.scss']
})
export class DataSourceSelectComponent implements OnInit {

  connections$: Observable<Page<DataSource>>;

  @Input()
  selected: DataSource;

  @Output()
  onUpdated = new EventEmitter<DataSource>();

  constructor(
    private service: DataSourceService
  ) {
  }

  ngOnInit(): void {
    this.connections$ = this.service.search(1);
  }

  onUpdate($event: DataSource) {
    this.onUpdated.emit($event);
  }

}
