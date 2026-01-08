import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PendingChangesInterface } from "@shared/interfaces/pending-changes.interface";
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CardHolder } from "@shared/components/card-holder/card-holder";

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CardHolder],
  templateUrl: "./test.html",
  styleUrl: "./test.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test implements PendingChangesInterface {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroyedRef = inject(DestroyRef);

  protected testForm = this._formBuilder.group({
    name: [""],
    email: [""],
  });

  protected signalTestForm = signal({
    name: "",
    email: "",
  });

  hasUnsavedChanges = signal(false);

  constructor() {}

  ngOnInit(): void {
    this.testForm.valueChanges
      .pipe(takeUntilDestroyed(this._destroyedRef))
      .subscribe(() => this.hasUnsavedChanges.set(true));
  }

  hasPendingChanges(): boolean | Observable<boolean> {
    // Implement your logic to determine if there are pending changes
    return this.hasUnsavedChanges();
  }
}
