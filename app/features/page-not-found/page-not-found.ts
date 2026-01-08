import {
  Component,
  computed,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  inject,
} from "@angular/core";
import { Button } from "@shared/components/button/button";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  imports: [CommonModule],
  templateUrl: "./page-not-found.html",
  styleUrls: ["./page-not-found.scss"],
})
export class PageNotFound implements OnDestroy {
  @ViewChild("buttonHost", { read: ViewContainerRef, static: true })
  private buttonHost!: ViewContainerRef;
  protected button = computed(() => Button);
  protected config = {
    text: "Home",
    variant: "primary",
    action: "cancel",
  };

  btnComponentRef?: ComponentRef<Button>;
  private btnSub?: Subscription;

  router = inject(Router);

  ngOnInit() {
    const compRef = this.buttonHost.createComponent<Button>(this.button());
    // Provide the input config to the dynamically created component
    if (typeof compRef.setInput === "function") {
      compRef.setInput("config", this.config);
    } else {
      (compRef.instance as any).config = this.config;
    }

    // Subscribe to the component's output (named `btnClick` on the Button component)
    if ((compRef.instance as any).btnClick?.subscribe) {
      this.btnSub = (compRef.instance as any).btnClick.subscribe(
        (action: string) => this.handleButtonClick(action),
      );
    }

    this.btnComponentRef = compRef;
  }

  ngOnDestroy() {
    this.btnSub?.unsubscribe();
    this.btnComponentRef?.destroy();
  }

  handleButtonClick(action: string) {
    console.log(`Action: ${action}`);
    // Handle the specific action based on the 'action' string
    if (action === "save") {
      // Logic for saving
    } else if (action === "cancel") {
      this.router.navigate(["/"]);
    }
  }
}
