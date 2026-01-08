import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardHolder } from "./card-holder";

describe("CardHolder", () => {
  let component: CardHolder;
  let fixture: ComponentFixture<CardHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHolder],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
