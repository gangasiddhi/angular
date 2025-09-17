import { CommonModule } from "@angular/common";
import {
  Component,
} from "@angular/core";
import {
  RouterLink,
  RouterLinkActive,
} from "@angular/router";

@Component({
  selector: 'app-side-menubar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menubar.html',
  styleUrl: './side-menubar.scss'
})

export class SideMenubar {

  menuData = [
    {
      routeLink: '/test',
      label: 'Test'
    },
    {
      routeLink: '/test1',
      label: 'Test1'
    },
    {
      routeLink: '/test2',
      label: 'Test2'
    },
    {
      routeLink: '/test3',
      label: 'Test3'
    },
    {
      routeLink: '/products',
      label: 'Products'
    },
  ];
}
