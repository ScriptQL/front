import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../interfaces/page";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {EditDataSourceModal} from "../../../data-source/modals/edit-data-source-modal/edit-data-source-modal.component";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  columns: string[] = ['name', 'email', 'access', 'more'];
  data: Page<User> = new Page<User>();

  constructor(
    private service: UserService,
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
