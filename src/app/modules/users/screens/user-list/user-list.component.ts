import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../interfaces/page";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import { EditUserModal } from './../../modals/edit-user-modal/edit-user-modal.component';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user";
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  columns: string[] = ['name', 'email', 'more'];
  data: Page<User> = new Page<User>();
  currentUser$: Observable<User>;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.onPage();
    this.currentUser$ = this.authService.getUser();  
  }

  onAdminAcess(user: User): boolean {
    return user.access === 'ADMIN';
  }

  onSameUser(user: User, id: string): boolean{
    return user.id === id;
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
    this.dialog.open(EditUserModal, {
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      location.reload();
    });
  }

  editUser(id: string): void {
    this.service.findById(id).subscribe({
      next: (user) => {
        this.dialog.open(EditUserModal, {
          width: '420px',
          data: user
        }).afterClosed().subscribe(data => {
          if (!data) {
            return;
          }
          location.reload();
        });
      },
      error: err => console.error(err)
    });
  }

}
