import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgOptimizedImage } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { Image } from "./image";

describe("Image", () => {
  let component: Image;
  let fixture: ComponentFixture<Image>;

  const sampleConfig = {
    src: "/assets/sample.png",
    alt: "Sample",
    width: 100,
    height: 100,
    class: "",
    fallback: "/assets/fallback.png",
    loading: "lazy",
    priority: false,
  } as const;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Image, NgOptimizedImage, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Image);
    component = fixture.componentInstance;
    // `imageOptions` is created via the `input()` helper and is a function.
    // Provide a simple function that returns the expected config so the
    // required input is available during change detection.
    // @ts-ignore - assign the runtime input accessor for testing
    component.imageOptions = () => sampleConfig;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
