import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingChangesInterface } from '@shared/interfaces/pending-changes.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './test.html',
  styleUrl: './test.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test implements PendingChangesInterface {
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  protected testForm = this._formBuilder.group({
    name: [''],
    email: ['']
  });

  hasUnsavedChanges = signal(false);

  constructor() {
    this.testForm.valueChanges.subscribe(() => this.hasUnsavedChanges.set(true));
  }

  hasPendingChanges(): boolean | Observable<boolean> {
    // Implement your logic to determine if there are pending changes
    return this.hasUnsavedChanges();
  }
}
