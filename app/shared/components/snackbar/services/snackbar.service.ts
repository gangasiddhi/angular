import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

export type SnackbarType = "success" | "error" | "info" | "warning";
export type SnackbarPosition = "top" | "bottom";

interface SnackbarConfig {
  heading: string;
  message: string;
  type?: SnackbarType;
  duration?: number;
  position?: SnackbarPosition;
}

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private _queue: SnackbarConfig[] = [];
  private _isShowing = false;

  private _heading: WritableSignal<string | null> = signal<string | null>(null);
  private _message: WritableSignal<string | null> = signal<string | null>(null);
  private _type: WritableSignal<SnackbarType> = signal<SnackbarType>("info");
  private _position: WritableSignal<SnackbarPosition> =
    signal<SnackbarPosition>("top");

  // Show public signal
  heading: Signal<string | null> = computed(() => this._heading());
  message: Signal<string | null> = computed(() => this._message());
  type: Signal<SnackbarType> = computed(() => this._type());
  position: Signal<SnackbarPosition> = computed(() => this._position());

  show(config: SnackbarConfig) {
    this._queue.push(config);
    this.processQueue();
  }

  private processQueue() {
    if (this._isShowing || this._queue.length === 0) return;

    const config = this._queue.shift()!;
    this._heading.set(config.heading);
    this._message.set(config.message);
    this._type.set(config.type || "info");
    this._position.set(config.position || "top");

    this._isShowing = true;

    setTimeout(() => {
      this.clear();
    }, config.duration || 2000);
  }

  clear() {
    this._heading.set(null);
    this._message.set(null);
    this._isShowing = false;

    // Small delay before processing the next item
    setTimeout(() => {
      this.processQueue();
    }, 250);
  }

  // Optional: manual dismiss
  dismissNow() {
    this._message.set(null);
    this._isShowing = false;
    this.processQueue();
  }
}
