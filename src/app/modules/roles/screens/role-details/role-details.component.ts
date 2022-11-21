import {ConfirmModal} from './../../../query/modals/confirm-modal/confirm-modal.component';
import {AddUserToRoleModal} from './../../modals/add-user-to-role-modal/add-user-to-role-modal.component';
import {Page} from './../../../../interfaces/page';
import {User} from './../../../../interfaces/user';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {mergeMap, Observable, tap} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {RoleService} from './../../../../services/role.service';
import {Role} from './../../../../interfaces/role';
import {Component, OnInit} from '@angular/core';
import {MessagingService} from "../../../../services/messaging.service";

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
    private dialog: MatDialog,
    private _msg: MessagingService) {
  }

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(mergeMap(url => {
      const id = url.get('id');
      return this.service.findById(id).pipe(tap(role => {
        this.role = role;
        this.onPage(role)
      }));
    }));
  }

  columns: string[] = ['name', 'email', 'more'];
  page: Page<User> = new Page<User>();
  role: Role;

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
    this.dialog.open(AddUserToRoleModal, {
      width: '420px'
    }).afterClosed().pipe(mergeMap(data => {
      if (!data) {
        return data;
      }

      return this.service.createUserRole(this.role.id, data);
    })).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => {
        this._msg.error(err.error?.message);
      }
    });
  }

  onDeleteUserRole(user: User): void {
    this.dialog.open(ConfirmModal, {
      data: {
        title: 'Tem certeza?',
        content: 'Deseja excluir esse usuário do grupo de acesso?'
      },
      width: '420px'
    }).afterClosed().pipe(mergeMap(shouldDelete => {
      if (shouldDelete) {
        return this.service.deleteUserRoleByRoleIdAndUserId(this.role.id, user.id);
      }

      return shouldDelete;
    })).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => {
        this._msg.error(err.error?.message);
      }
    })
  }
}
