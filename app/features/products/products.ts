import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ProductService } from "./services/product.service";
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./products.html",
  styleUrl: "./products.scss",
  providers: [ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {}
