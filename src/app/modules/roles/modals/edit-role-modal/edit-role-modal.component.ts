import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";
import {Role} from "../../../../interfaces/role";
import {RoleService} from "../../../../services/role.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-role-modal',
  templateUrl: './edit-role-modal.component.html',
  styleUrls: ['./edit-role-modal.component.scss']
})
export class EditRoleModal {

  existing: Role;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormService,
    private service: RoleService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditRoleModal>,
    @Inject(MAT_DIALOG_DATA) public data: Role
  ) {
    this.existing = data;
    this.form = this.fb.group({
      name: [data?.name, [
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
    let http: Observable<Role>;
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
        this._snackBar.open(error.error?.message, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.fb.setLoading(this.form, (this.loading = false));
      }
    });
  }

}
