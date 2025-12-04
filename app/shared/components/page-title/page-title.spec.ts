import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Title } from "@angular/platform-browser";

import { PageTitle } from "./page-title";

describe("PageTitle", () => {
  let component: PageTitle;
  let fixture: ComponentFixture<PageTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitle, RouterTestingModule.withRoutes([])],
      providers: [{ provide: Title, useValue: { setTitle: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
