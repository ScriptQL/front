import {Component, Input, OnInit} from '@angular/core';
import {DataSource} from "../../../../interfaces/data-source";
import {DataSourceService} from "../../../../services/data-source.service";
import {mergeMap, Observable} from "rxjs";
import {Role} from "../../../../interfaces/role";
import {AddReviewerRoleModal} from "../../../query/modals/add-reviewer-role-modal/add-reviewer-role-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagingService} from "../../../../services/messaging.service";

@Component({
  selector: 'app-data-source-reviewers',
  templateUrl: './data-source-reviewers.component.html',
  styleUrls: ['./data-source-reviewers.component.scss']
})
export class DataSourceReviewersComponent implements OnInit {

  @Input()
  dataSource: DataSource;

  columns: string[] = ['name', 'more'];
  data$: Observable<Role[]>;

  constructor(
    private service: DataSourceService,
    private dialog: MatDialog,
    private _msg: MessagingService) {
  }

  ngOnInit(): void {
    this.data$ = this.service.fetchReviewers(this.dataSource.id);
  }

  onAddReviewer() {
    this.dialog.open(AddReviewerRoleModal, {}).afterClosed().pipe(mergeMap(data => {
      if (!data) {
        return data;
      }
      return this.service.addReviewer(this.dataSource.id, data);
    })).subscribe({
      next: (data) => {
        if (!data) {
          return;
        }
        this.ngOnInit();
      },
      error: (error) => {
        this._msg.error(error.error?.message);
      }
    });
  }

  onDelete(role: Role): void {
    this.service.deleteReviewer(this.dataSource.id, role).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error) => {
        this._msg.error(error.error?.message);
      }
    });
  }

}
