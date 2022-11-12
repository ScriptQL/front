import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../interfaces/user';
import { Component } from '@angular/core';

@Component({
  selector: 'add-user-to-role-modal',
  templateUrl: './add-user-to-role-modal.component.html',
  styleUrls: ['./add-user-to-role-modal.component.scss']
})
export class AddUserToRoleModal {

  selected: User;

  constructor(
    public dialogRef: MatDialogRef<AddUserToRoleModal>
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.selected);
  }

  onUpdated($event: User) {
    this.selected = $event;
  }

}
