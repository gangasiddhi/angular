import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { Breadcrumb } from "./breadcrumb";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import { of, Subject } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe("Breadcrumb Component", () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;
  //let router: Router;
  //let route: ActivatedRoute;
  let routerEvents$: Subject<RouterEvent>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [],
              data: {},
            },
            root: {
              children: [
                {
                  snapshot: {
                    url: [{ path: "home" }],
                    data: { title: "Home" },
                  },
                  children: [],
                },
              ],
            },
            data: of({ breadcrumbs: [] }),
            children: [],
          },
        },
        {
          provide: Router,
          useValue: {
            events: routerEvents$.asObservable(),
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    // router = TestBed.inject(Router);
    //route = TestBed.inject(ActivatedRoute);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should generate breadcrumbs from ActivatedRoute on navigation", () => {
    component.ngOnInit();
    fixture.detectChanges();

    routerEvents$.next(new NavigationEnd(1, "/home", "/home"));
    fixture.detectChanges();

    expect(component["breadcrumbs"]).toEqual([{ label: "Home", url: "/home" }]);
  });

  it("should return an empty breadcrumb if no title is present", () => {
    const fakeRoute = {
      children: [
        {
          snapshot: {
            url: [{ path: "no-title" }],
            data: {},
          },
          children: [],
        },
      ],
    } as unknown as ActivatedRoute;

    const breadcrumbs = component["createBreadcrumbs"](fakeRoute);

    expect(breadcrumbs).toEqual([]);
  });

  it("should read breadcrumbs$ from route data", (done) => {
    component.breadcrumbs$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([]);
      done();
    });
  });

  describe("Breadcrumb Template Rendering", () => {
    it("should not render breadcrumb nav if only one or zero breadcrumbs", () => {
      component["breadcrumbs"] = [{ label: "Only", url: "/only" }];
      fixture.detectChanges();

      const nav = fixture.debugElement.query(By.css("nav"));
      expect(nav).toBeNull();
    });

    it("should render breadcrumb nav if more than one breadcrumb", () => {
      component["breadcrumbs"] = [
        { label: "Home", url: "/home" },
        { label: "Dashboard", url: "/home/dashboard" },
      ];
      fixture.detectChanges();

      const nav = fixture.debugElement.query(By.css("nav"));
      expect(nav).not.toBeNull();

      const links = fixture.debugElement.queryAll(By.css("a"));
      expect(links.length).toBe(1); // Only first breadcrumb is a link

      const active = fixture.debugElement.query(
        By.css('[aria-current="page"] span.text-gray-500'),
      );
      expect(active.nativeElement.textContent.trim()).toBe("Dashboard");
    });
  });
});
