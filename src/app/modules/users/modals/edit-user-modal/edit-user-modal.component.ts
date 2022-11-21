import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";
import {User} from "../../../../interfaces/user";
import {UserService} from "../../../../services/user.service";
import {Observable} from "rxjs";
import {MessagingService} from "../../../../services/messaging.service";

@Component({
  selector: 'app-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModal {
  userStatus: string[] = ["Ativo", "Inativo"];
  existing: User;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormService,
    private service: UserService,
    private _msg: MessagingService,
    public dialogRef: MatDialogRef<EditUserModal>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.existing = data;
    this.form = this.fb.group({
      name: [data?.name, [
        Validators.required
      ]],
      email: [data?.email, [
        Validators.required
      ]],
      password: [data?.password, [
        Validators.required
      ]],
      status: [data?.status ?? 'Ativo', [
        Validators.required
      ]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.fb.check(this.form)) {
      return;
    }
    this.fb.setLoading(this.form, (this.loading = true));
    const request = this.form.getRawValue();
    let http: Observable<User>;
    if (this.existing) {
      http = this.service.patch(this.existing.id, request);
    } else {
      http = this.service.create(request);
    }
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
