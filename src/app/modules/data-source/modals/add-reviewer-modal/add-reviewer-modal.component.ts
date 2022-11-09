import {Component} from '@angular/core';
import {Role} from "../../../../interfaces/role";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-reviewer-modal',
  templateUrl: './add-reviewer-modal.component.html',
  styleUrls: ['./add-reviewer-modal.component.scss']
})
export class AddReviewerModal {

  selected: Role;

  constructor(
    public dialogRef: MatDialogRef<AddReviewerModal>
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
