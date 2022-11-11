import { ChangePasswordModal } from './../modals/change-password/change-password-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog) {
  }

  onHome(): void {
    this.router.navigate(['/queries']).finally();
  }

  onLogout(): void {
    this.auth.logout();
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordModal, {
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      location.reload();
    });
  }
}
