import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import { PageTitle } from "@shared/components/page-title/page-title";
import { SideMenubar } from "@shared/components/side-menubar/side-menubar";
import { ButtonConfig } from "./shared/components/button/button-config";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, NgComponentOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected breadcrumb = computed(() => Breadcrumb);
  protected pageTitle = computed(() => PageTitle);
  protected sideMenubar = computed(() => SideMenubar);

  constructor() {
  }

  config: ButtonConfig = {
    text: "Cancel",
    variant: "secondary",
    action: "cancel",
  };

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
