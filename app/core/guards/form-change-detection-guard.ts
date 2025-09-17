import { CanDeactivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { PendingChangesInterface } from "@shared/interfaces/pending-changes.interface";
import { ConfirmDialogDataInterface } from "@shared/components/confirm-dialog/confirm-dialog-data.interface";
import { ConfirmDialogService } from "@shared/components/confirm-dialog/services/confirm-dialog.service";

export const formChangeDetectionGuard: CanDeactivateFn<
  PendingChangesInterface
> = (component) => {
  const confirmService = inject(ConfirmDialogService);
  // Check if the component implements the interface and has pending changes
  if (component && component.hasPendingChanges()) {
    return confirmService.confirm({
      headerText: "Confirm",
      message:
        "Are you sure you want to navigate away? Your changes are not saved.",
      cancelText: "Cancel",
      confirmText: "Okay",
    } as ConfirmDialogDataInterface);
  }

  return true;
};
