import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {Page} from "../../../../interfaces/page";
import { EditRoleModal } from './../edit-role-modal/edit-role-modal.component';
import { Role } from './../../../../interfaces/role';
import { RoleService } from './../../../../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  columns: string[] = ['name', 'more'];
  data: Page<Role> = new Page<Role>();

  constructor(private service: RoleService,
    private dialog: MatDialog) { }

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
    this.dialog.open(EditRoleModal, {
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      location.reload();
    });
  }

  deleteRole(id: string) {
    this.service.delete(id).subscribe({
      next: () => this.onPage(),
      error: error => console.error(error)
    });
  }

}
