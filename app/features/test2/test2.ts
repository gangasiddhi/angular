import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PendingChangesInterface } from '@shared/interfaces/pending-changes.interface';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './test2.html',
  styleUrl: './test2.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test2 implements PendingChangesInterface {
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
