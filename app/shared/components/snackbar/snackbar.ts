import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  SnackbarPosition,
  SnackbarService,
  SnackbarType,
} from "./services/snackbar.service";

import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  imports: [MatIconModule],
  templateUrl: "./snackbar.html",
  styleUrl: "./snackbar.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Snackbar {
  isVisible: WritableSignal<boolean> = signal<boolean>(false);
  heading: WritableSignal<string> = signal<string>("");
  message: WritableSignal<string> = signal<string>("");
  type: WritableSignal<SnackbarType> = signal<SnackbarType>("info");
  position: WritableSignal<SnackbarPosition> = signal<SnackbarPosition>("top");

  private _snackbarService = inject(SnackbarService);

  get icon(): string {
    switch (this._snackbarService.type()) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "notifications";
    }
  }

  constructor() {
    effect(() => {
      const msg = this._snackbarService.message();
      const heading = this._snackbarService.heading();
      if (msg && heading) {
        this.heading.set(heading);
        this.message.set(msg);
        this.type.set(this._snackbarService.type());
        this.position.set(this._snackbarService.position());
        this.isVisible.set(true);
      } else {
        this.isVisible.set(false);
      }
    });
  }

  close() {
    this.isVisible.set(false);
  }
}
