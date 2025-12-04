import { Injectable, OnDestroy } from "@angular/core";
import { fromEvent, interval, merge, Subject, Subscription } from "rxjs";
import { throttleTime, takeUntil } from "rxjs/operators";

/**
 * IdlePollingService
 * - Detects user activity (mouse, keyboard, touch, click).
 * - When no activity occurs for `idleTimeoutMs`, starts a polling interval.
 * - Emits a tick on `polling$` for consumers to perform background work.
 *
 * Consumers: inject the service (it starts automatically) and subscribe to
 * `polling$` to receive polling ticks.
 */
@Injectable({ providedIn: "root" })
export class IdlePollingService implements OnDestroy {
  private readonly idleTimeoutMs = 1 * 60 * 1000; // 1 minute
  private readonly pollIntervalMs = 60 * 1000; // 1 minute

  private lastActivity = Date.now();
  private isIdle = false;
  private pollingSub?: Subscription;
  private readonly destroy$ = new Subject<void>();

  public readonly polling$ = new Subject<void>();

  constructor() {
    // Listen for typical user interaction events
    const activityEvents = merge(
      fromEvent(document, "mousemove"),
      fromEvent(document, "keydown"),
      fromEvent(document, "touchstart"),
      fromEvent(document, "click"),
    );

    // Update last activity, throttle to avoid excessive updates
    activityEvents.pipe(throttleTime(500), takeUntil(this.destroy$)).subscribe(() => {
      this.onActivity();
    });

    // Periodically check for idle state
    interval(1000*60*1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('IdlePollingService checking idle state');
        const idleMs = Date.now() - this.lastActivity;
        if (!this.isIdle && idleMs >= this.idleTimeoutMs) {
          this.startPolling();
        } else if (this.isIdle && idleMs < this.idleTimeoutMs) {
          this.stopPolling();
        }
      });
  }

  private onActivity(): void {
    this.lastActivity = Date.now();
    if (this.isIdle) {
      this.isIdle = false;
      this.stopPolling();
    }
  }

  private startPolling(): void {
    if (this.pollingSub) {
      return;
    }
    this.isIdle = true;
    // Emit immediately, then every pollIntervalMs
    this.polling$.next();
    this.pollingSub = interval(this.pollIntervalMs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.polling$.next());
  }

  private stopPolling(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
      this.pollingSub = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.polling$.complete();
    this.stopPolling();
  }
}
