import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PendingChangesInterface } from "@shared/interfaces/pending-changes.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-test1",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./test1.html",
  styleUrl: "./test1.scss",
})
export class Test1 implements PendingChangesInterface {
  // Use a Signal to make the state reactive
  currentPage = signal("test");

  private readonly _router = inject(Router);
  protected readonly _formBuilder = inject(FormBuilder);

  protected testForm = this._formBuilder.group({
    name: [""],
    email: [""],
  });

  hasUnsavedChanges = signal(false);

  constructor() {
    this.testForm.valueChanges.subscribe(() =>
      this.hasUnsavedChanges.set(true),
    );
  }

  hasPendingChanges(): boolean | Observable<boolean> {
    // Implement your logic to determine if there are pending changes
    return this.hasUnsavedChanges();
  }

  async navigateAndTrack(path: string) {
    console.log(path);
    // Wait for the navigation to complete successfully
    const navigationSuccessful = await this._router.navigate([path]);
    if (navigationSuccessful) {
      // The navigation is done; now update the signal to trigger
      // a change detection cycle for your component's template.
      this.currentPage.set(path);
    }
  }
}
