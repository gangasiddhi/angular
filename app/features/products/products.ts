import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "./services/product.service";
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./products.html",
  styleUrl: "./products.scss",
  providers: [ProductService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Products {}
