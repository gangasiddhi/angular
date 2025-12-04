import { Component, computed } from "@angular/core";
import { Button } from "@shared/components/button/button";
import { CommonModule, NgComponentOutlet } from "@angular/common";

@Component({
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: "./page-not-found.html",
  styleUrl: "./page-not-found.scss",
})
export class PageNotFound {
  protected button = computed(() => Button);
  protected config = {
    text: "Cancel",
    variant: "primary",
    action: "cancel",
  };

  protected dummyData = computed(() => {
    return Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
  });
  protected isDataLoaded = computed(() => true);

  handleButtonClick(action: string) {
    console.log(`Action: ${action}`);
    // Handle the specific action based on the 'action' string
    if (action === "save") {
      // Logic for saving
    } else if (action === "cancel") {
      // Logic for canceling
    }
  }
}
