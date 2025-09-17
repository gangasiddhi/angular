import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PendingChangesInterface } from "@shared/interfaces/pending-changes.interface";
import { Observable, filter, from, map, tap, of, concat, merge, interval, take, combineLatest, timer, withLatestFrom, combineLatestAll } from "rxjs";

@Component({
  selector: "app-test",
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./test.html",
  styleUrl: "./test.scss",
})
export class Test implements PendingChangesInterface {
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

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

  ngOnInit(): void {

    const data:Observable<number> = from([1,2,3,4,5]);
    const data1:Observable<number> = from([6,7,8,9,10]);
    console.log('Data Stream');
    data.pipe(tap((value) => console.log( value))).subscribe();
    console.log('Mapped Data Stream');
    data.pipe(map((value) => value * 2),tap((value) => console.log( value))).subscribe();
    console.log('Filtered Data Stream');
    data.pipe(filter((value)=> value % 2 === 0),tap((value) => console.log( value))).subscribe();
    console.log('Combined Data Stream');
    concat(data,data1).pipe(tap((value) => console.log( value))).subscribe();
    
    
    const source1 = timer(1000,3000).pipe(take(2));
    const source2 = timer(2000, 3000).pipe(take(2));
     const source3 = timer(3000, 3000).pipe(take(2));

    // console.log('Merge');
    // merge(source1,source2).pipe(tap((value) => console.log( value))).subscribe();

    console.log('CombineLatest');
    combineLatest([source1,source2,source3]).pipe(tap((value) => console.log( value))).subscribe();
  }
}
