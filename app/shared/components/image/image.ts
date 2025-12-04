import { Component, computed, input } from "@angular/core";
import { CustomImageConfig } from "./image-config";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgOptimizedImage } from "@angular/common";

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, NgOptimizedImage],
  templateUrl: "./image.html",
  styleUrl: "./image.scss",
})
export class Image {
  protected readonly imageOptions = input.required<CustomImageConfig>();
  // default values
  private readonly defaults: CustomImageConfig = {
    src: "",
    alt: "",
    width: "auto",
    height: "auto",
    class: "",
    fallback: "/assets/fallback.png",
    loading: "lazy",
    priority: false,
  };

  protected readonly config = computed(() => ({
    ...this.defaults,
    ...this.imageOptions(),
  }));

  hasError = false;

  onError(): void {
    this.hasError = true;
  }
}
