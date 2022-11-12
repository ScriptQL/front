import { Page } from './../../../../interfaces/page';
import { User } from './../../../../interfaces/user';
import { UserService } from './../../../../services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {mergeMap, Observable, tap} from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from './../../../../services/role.service';
import { Role } from './../../../../interfaces/role';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  data$: Observable<Role>;

  constructor(
    private route: ActivatedRoute,
    private service: RoleService,
    private queries: UserService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(mergeMap(url => {
      const id = url.get('id');
      return this.service.findById(id).pipe(tap(role => this.onPage(role)));
    }));
  }

  columns: string[] = ['name', 'email', 'more'];
  page: Page<User> = new Page<User>();

  onPage(role: Role, $event?: PageEvent): void {
    let index;
    if ($event) {
      index = $event.pageIndex + 1;
    } else {
      index = this.page.page;
    }

    this.service.findUsersByRoleId(role.id, index)
      .subscribe({
        next: data => {
          this.page = data;
        },
        error: err => console.error(err)
      })
  }

  onAddUser(): void {
    // @TODO: IMPLEMENT THIS
  }

  onDeleteUser(user: User): void {
    // @TODO: IMPLEMENT THIS
  }
}
