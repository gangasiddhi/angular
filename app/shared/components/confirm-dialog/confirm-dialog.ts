import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogDataInterface } from "./confirm-dialog-data.interface";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [],
  templateUrl: "./confirm-dialog.html",
  styleUrl: "./confirm-dialog.scss",
})
export class ConfirmDialog {
  private readonly _dialogRef = inject(MatDialogRef<ConfirmDialog>);
  protected readonly data = inject(
    MAT_DIALOG_DATA,
  ) as ConfirmDialogDataInterface;

  cancel(): void {
    this._dialogRef.close(false);
  }

  confirm(): void {
    this._dialogRef.close(true);
  }
}
