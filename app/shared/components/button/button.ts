import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  computed,
} from "@angular/core";
import { ButtonConfig } from "./button-config";

@Component({
  standalone: true,
  imports: [],
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  protected readonly config = input.required<ButtonConfig>();

  // default values
  private readonly defaults: ButtonConfig = {
    type: "button",
    text: "Submit",
    variant: "primary",
    action: "submit",
  };

  protected readonly finalConfig = computed(() => ({
    ...this.defaults,
    ...this.config(),
  }));

  protected readonly btnClick = output<string>();

  onClick() {
    if (this.finalConfig().action === undefined) {
      return;
    }
    this.btnClick.emit(this.finalConfig().action ?? "");
  }
}
