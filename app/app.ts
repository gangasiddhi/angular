import {
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import {
  RouterOutlet,
} from "@angular/router";
import { ButtonConfig } from "./shared/components/button/button-config";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import { PageTitle } from "@shared/components/page-title/page-title";
import { SideMenubar } from "@shared/components/side-menubar/side-menubar";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, Breadcrumb, PageTitle, SideMenubar],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  private readonly _cdr = inject(ChangeDetectorRef);

  config: ButtonConfig = {
    text: "Cancel",
    variant: "secondary",
    action: "cancel",
  };

  onActivate() {
    this._cdr.markForCheck();
  }

  handleButtonClick(action: string) {
    console.log(`Action: ${action}`);
    // Handle the specific action based on the 'action' string
    if (action === "save") {
      // Logic for saving
    } else if (action === "cancel") {
      // Logic for canceling
    }
  }
}
