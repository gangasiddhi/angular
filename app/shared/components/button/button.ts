import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  HostBinding,
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
  config = input.required<ButtonConfig>();
  btnClick = output<string>();

  @HostBinding("class") get classBinding() {
    return `btn btn-${this.config().variant || "primary"}`;
  }

  onClick() {
    if (this.config().action === undefined) {
      return;
    }

    this.btnClick.emit(this.config().action ?? "");
  }
}
