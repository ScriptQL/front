import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  public error(message: string): void {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'snack-error'
    });
  }

}
