import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { SpinnerService } from "./services/spinner.service";

@Component({
  standalone: true,
  imports: [],
  templateUrl: "./spinner.html",
  styleUrl: "./spinner.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  private _spinnerService = inject(SpinnerService);
  private _showSpinner: WritableSignal<boolean> = signal<boolean>(false);
  protected showSpinner: Signal<boolean> = computed(() => this._showSpinner());

  constructor() {
    effect(() => {
      this._showSpinner.set(this._spinnerService.loading());
    });
  }
}
