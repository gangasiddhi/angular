import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import { PageTitle } from "@shared/components/page-title/page-title";
import { SideMenubar } from "@shared/components/side-menubar/side-menubar";
import { Snackbar } from "@shared/components/snackbar/snackbar";
import { Spinner } from "@shared/components/spinner/spinner";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, NgComponentOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected breadcrumb = computed(() => Breadcrumb);
  protected pageTitle = computed(() => PageTitle);
  protected sideMenubar = computed(() => SideMenubar);
  protected snackbar = computed(() => Snackbar);
  protected spinner = computed(() => Spinner);
}
