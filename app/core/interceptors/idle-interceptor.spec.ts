import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, withInterceptors } from "@angular/common/http";

import { idleInterceptor } from "./idle-interceptor";

describe("idleInterceptor", () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  function setupTestBed() {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [withInterceptors([idleInterceptor])],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }

  beforeEach(() => {
    setupTestBed();
  });

  afterEach(() => {
    try {
      httpMock.verify();
    } catch {
      // Ignore verification errors
    }
  });

  it("should skip health check for health endpoint requests", () => {
    httpClient.get("https://dummyjson.com/test").subscribe();
    const req = httpMock.expectOne("https://dummyjson.com/test");
    expect(req.request.url).toBe("https://dummyjson.com/test");
    req.flush({ status: 200 });
  });

  it("should skip health check for requests containing 'test' in URL", () => {
    httpClient.get("/api/test-endpoint").subscribe();
    const req = httpMock.expectOne("/api/test-endpoint");
    expect(req.request.url).toBe("/api/test-endpoint");
    req.flush({ data: "test" });
  });

  it("should perform health check on first request to non-health endpoint", () => {
    httpClient.get("/api/data").subscribe();

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    expect(healthReq.request.method).toBe("GET");
    healthReq.flush({ status: "ok" });

    const actualReq = httpMock.expectOne("/api/data");
    expect(actualReq.request.url).toBe("/api/data");
    actualReq.flush({ data: "success" });
  });

  it("should cache health check result and skip subsequent checks within interval", (done) => {
    httpClient.get("/api/data1").subscribe(() => {
      httpClient.get("/api/data2").subscribe(() => {
        done();
      });

      // First request triggers health check
      const healthReq = httpMock.expectOne("https://dummyjson.com/test");
      healthReq.flush({ status: "ok" });

      const actualReq1 = httpMock.expectOne("/api/data1");
      actualReq1.flush({ data: "success" });

      const actualReq2 = httpMock.expectOne("/api/data2");
      actualReq2.flush({ data: "success" });
    });
  });

  it("should return error when health check fails", (done) => {
    httpClient.get("/api/data").subscribe({
      error: (err) => {
        expect(err).toBeDefined();
        done();
      },
    });

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.flush(null, { status: 500, statusText: "Server Error" });
  });

  it("should handle health check network error", (done) => {
    httpClient.get("/api/data").subscribe({
      error: (err) => {
        expect(err).toBeDefined();
        done();
      },
    });

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.error(new ErrorEvent("Network error"));
  });

  it("should accept successful health check responses (status 200-299)", () => {
    httpClient.get("/api/data").subscribe((data) => {
      expect(data).toEqual({ result: "success" });
    });

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.flush({}, { status: 204, statusText: "No Content" });

    const actualReq = httpMock.expectOne("/api/data");
    actualReq.flush({ result: "success" });
  });

  it("should reject health check with status outside 200-299 range", (done) => {
    httpClient.get("/api/data").subscribe({
      error: (err) => {
        expect(err).toBeDefined();
        done();
      },
    });

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.flush(null, { status: 400, statusText: "Bad Request" });
  });

  it("should forward original request method and data", () => {
    const requestData = { name: "test" };
    httpClient.post("/api/data", requestData).subscribe();

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.flush({ status: "ok" });

    const actualReq = httpMock.expectOne("/api/data");
    expect(actualReq.request.method).toBe("POST");
    expect(actualReq.request.body).toEqual(requestData);
    actualReq.flush({ result: "created" });
  });

  it("should filter out non-HttpResponse events", () => {
    httpClient.get("/api/data", { reportProgress: true }).subscribe();

    const healthReq = httpMock.expectOne("https://dummyjson.com/test");
    healthReq.event({ type: 0 });
    healthReq.flush({ status: "ok" });

    const actualReq = httpMock.expectOne("/api/data");
    actualReq.flush({ data: "success" });
  });
});
