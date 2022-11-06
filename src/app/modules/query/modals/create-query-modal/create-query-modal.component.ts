import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'app-create-query-modal',
  templateUrl: './create-query-modal.component.html',
  styleUrls: ['./create-query-modal.component.scss']
})
export class CreateQueryModal {

  form: FormGroup;

  constructor(
    private forms: FormService,
    public dialogRef: MatDialogRef<CreateQueryModal>
  ) {
    this.form = this.forms.group({
      query: ['', [
        Validators.required,
        Validators.maxLength(4000)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(4000)
      ]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.forms.check(this.form);
  }

}
