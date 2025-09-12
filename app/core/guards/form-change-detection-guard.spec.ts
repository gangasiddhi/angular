import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { formChangeDetectionGuard } from './form-change-detection-guard';
import { PendingChangesInterface } from '../../shared/interfaces/pending-changes.interface';

describe('formChangeDetectionGuard', () => {
  const executeGuard: CanDeactivateFn<PendingChangesInterface> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formChangeDetectionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
