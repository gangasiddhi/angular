import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog } from '../confirm-dialog';
import { ConfirmDialogDataInterface } from '../confirm-dialog-data.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfirmDialogService {
  private readonly _dialog = inject(MatDialog);

  confirm(data: ConfirmDialogDataInterface): Observable<boolean> {

    const dialogRef = this._dialog.open(ConfirmDialog, {
      width: '400px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        headerText: data.headerText || 'Confirmation',
        message: data.message,
        cancelText: data.cancelText || 'Cancel',
        confirmText: data.confirmText || 'Confirm'
      }
    });
    
    return dialogRef.afterClosed();
  }
}
