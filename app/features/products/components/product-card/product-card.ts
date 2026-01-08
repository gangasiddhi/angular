import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Image } from "@shared/components/image/image";

export interface ProductCardInput {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./product-card.html",
  styleUrl: "./product-card.scss",
})
export class ProductCard {
  protected readonly image = computed(() => Image);
  protected product = input.required<ProductCardInput>();
}
