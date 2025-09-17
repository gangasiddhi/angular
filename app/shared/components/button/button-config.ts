export interface ButtonConfig {
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "text";
  disabled?: boolean;
  action?: string; // Identifier for the click event
}
