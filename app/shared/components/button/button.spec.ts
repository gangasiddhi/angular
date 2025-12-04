import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Button } from "./button";
import { ButtonConfig } from "./button-config";

describe("Button", () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  const sampleConfig: ButtonConfig = {
    text: "Test Button",
    type: "button",
    variant: "primary",
    action: "test-action",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    // Assign the config input function so the required input is available
    // @ts-ignore - assign the runtime input accessor for testing
    component.config = () => sampleConfig;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
