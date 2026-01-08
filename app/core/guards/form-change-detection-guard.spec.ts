import { TestBed } from "@angular/core/testing";
import { runInInjectionContext } from "@angular/core";
import { formChangeDetectionGuard } from "./form-change-detection-guard";
import { ConfirmDialogService } from "@shared/components/confirm-dialog/services/confirm-dialog.service";
import { PendingChangesInterface } from "@shared/interfaces/pending-changes.interface";
import { ConfirmDialogDataInterface } from "@shared/components/confirm-dialog/confirm-dialog-data.interface";
import { of } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("formChangeDetectionGuard", () => {
  let confirmDialogService: jasmine.SpyObj<ConfirmDialogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("ConfirmDialogService", ["confirm"]);
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfirmDialogService, useValue: spy },
      ],
    });
    confirmDialogService = TestBed.inject(
      ConfirmDialogService
    ) as jasmine.SpyObj<ConfirmDialogService>;
  });

  it("should return true when component is null", () => {
    const result = TestBed.runInInjectionContext(() => {
      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      return formChangeDetectionGuard(null as any, mockCurrentRoute, mockCurrentState, mockNextState);
    });
    expect(result).toBe(true);
    expect(confirmDialogService.confirm).not.toHaveBeenCalled();
  });

  it("should return true when component has no pending changes", () => {
    const result = TestBed.runInInjectionContext(() => {
      const mockComponent: PendingChangesInterface = {
        hasPendingChanges: jasmine.createSpy("hasPendingChanges").and.returnValue(false),
      };

      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      return formChangeDetectionGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState);
    });
    expect(result).toBe(true);
    expect(confirmDialogService.confirm).not.toHaveBeenCalled();
  });

  it("should call confirmService.confirm when component has pending changes", () => {
    confirmDialogService.confirm.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const mockComponent: PendingChangesInterface = {
        hasPendingChanges: jasmine.createSpy("hasPendingChanges").and.returnValue(true),
      };

      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      formChangeDetectionGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState);
    });
    expect(confirmDialogService.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        headerText: "Confirm",
        message: "Are you sure you want to navigate away? Your changes are not saved.",
        cancelText: "Cancel",
        confirmText: "Okay",
      }) as unknown as ConfirmDialogDataInterface
    );
  });

  it("should return the confirm service result when component has pending changes and user confirms", () => {
    const confirmResult = of(true);
    confirmDialogService.confirm.and.returnValue(confirmResult);

    const result = TestBed.runInInjectionContext(() => {
      const mockComponent: PendingChangesInterface = {
        hasPendingChanges: jasmine.createSpy("hasPendingChanges").and.returnValue(true),
      };

      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      return formChangeDetectionGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState);
    });
    expect(result).toBe(confirmResult);
  });

  it("should return the confirm service result when component has pending changes and user cancels", () => {
    const confirmResult = of(false);
    confirmDialogService.confirm.and.returnValue(confirmResult);

    const result = TestBed.runInInjectionContext(() => {
      const mockComponent: PendingChangesInterface = {
        hasPendingChanges: jasmine.createSpy("hasPendingChanges").and.returnValue(true),
      };

      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      return formChangeDetectionGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState);
    });
    expect(result).toBe(confirmResult);
  });

  it("should pass correct dialog data to confirm service", () => {
    confirmDialogService.confirm.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const mockComponent: PendingChangesInterface = {
        hasPendingChanges: jasmine.createSpy("hasPendingChanges").and.returnValue(true),
      };

      const mockCurrentRoute = {} as ActivatedRouteSnapshot;
      const mockCurrentState = {} as RouterStateSnapshot;
      const mockNextState = {} as RouterStateSnapshot;

      formChangeDetectionGuard(mockComponent, mockCurrentRoute, mockCurrentState, mockNextState);
    });

    const callArgs = confirmDialogService.confirm.calls.mostRecent().args[0];
    expect(callArgs.headerText).toBe("Confirm");
    expect(callArgs.message).toContain("navigate away");
    expect(callArgs.message).toContain("not saved");
    expect(callArgs.cancelText).toBe("Cancel");
    expect(callArgs.confirmText).toBe("Okay");
  });
});
