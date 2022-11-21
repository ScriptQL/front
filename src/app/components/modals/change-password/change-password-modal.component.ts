import {User} from '../../../interfaces/user';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {FormService} from '../../../services/form.service';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {MessagingService} from "../../../services/messaging.service";

@Component({
  selector: 'change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModal implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  currentUser: User;

  constructor(
    private fb: FormService,
    private service: UserService,
    private authService: AuthService,
    private _msg: MessagingService,
    public dialogRef: MatDialogRef<ChangePasswordModal>
  ) {
    this.form = this.fb.group({
      currentPwd: ['', [
        Validators.required
      ]],
      newPwd: ['', [
        Validators.required
      ]],
      newPwdConfirmation: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: user => {
        this.currentUser = user;
      },
      error: err => console.error(err)
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // @TODO: implement here the logic to save new password.
    if (!this.fb.check(this.form)) {
      return;
    }
    this.fb.setLoading(this.form, (this.loading = true));
    const request = this.form.getRawValue();
    let http: Observable<User>;
    http = this.service.newPassword(this.currentUser.id, request);
    http.subscribe({
      next: (data) => {
        this.dialogRef.close(data);
      },
      error: (error) => {
        this._msg.error(error.error?.message);
        this.fb.setLoading(this.form, (this.loading = false));
      }
    });
  }

}
