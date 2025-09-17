import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "./services/product.service";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./products.html",
  styleUrl: "./products.scss",
  providers: [ProductService],
})
export class Products {}
