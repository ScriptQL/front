import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";
import {DataSource} from "../../../../interfaces/data-source";
import {DataSourceService} from "../../../../services/data-source.service";
import {Observable} from "rxjs";
import {MessagingService} from "../../../../services/messaging.service";

@Component({
  selector: 'app-edit-data-source-modal',
  templateUrl: './edit-data-source-modal.component.html',
  styleUrls: ['./edit-data-source-modal.component.scss']
})
export class EditDataSourceModal {

  drivers: string[] = ["POSTGRES", "MYSQL"];
  existing: DataSource;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormService,
    private service: DataSourceService,
    private _msg: MessagingService,
    public dialogRef: MatDialogRef<EditDataSourceModal>,
    @Inject(MAT_DIALOG_DATA) public data: DataSource
  ) {
    this.existing = data;
    this.form = this.fb.group({
      name: [data?.name, [
        Validators.required
      ]],
      host: [data?.host, [
        Validators.required
      ]],
      driver: [data?.driver, [
        Validators.required
      ]],
      port: [data?.port, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],
      database: [data?.database, [
        Validators.required
      ]],
      username: [data?.username, [
        Validators.required
      ]],
      password: [null, data ? [] : [Validators.required]]
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
    let http: Observable<DataSource>;
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
