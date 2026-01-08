import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./side-menubar.html",
  styleUrl: "./side-menubar.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenubar {
  menuData = [
    {
      routeLink: "/test",
      label: "Test",
    },
    {
      routeLink: "/test2",
      label: "Test2",
    },
    {
      routeLink: "/products",
      label: "Products",
    },
    {
      routeLink: "/demo",
      label: "Demo",
    },
  ];
}
