import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Role} from "../../../../interfaces/role";

@Component({
  selector: 'app-add-reviewer-role-modal',
  templateUrl: './add-reviewer-role-modal.component.html',
  styleUrls: ['./add-reviewer-role-modal.component.scss']
})
export class AddReviewerRoleModal {

  selected: Role;

  constructor(
    public dialogRef: MatDialogRef<AddReviewerRoleModal>
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.selected);
  }

  onUpdated($event: Role) {
    this.selected = $event;
  }

}
