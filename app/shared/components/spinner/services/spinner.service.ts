import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  private _loading: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._loading());

  show(): void {
    this._loading.set(true);
  }

  hide(): void {
    this._loading.set(false);
  }
}
