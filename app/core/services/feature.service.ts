import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export abstract class FeatureService<T> {
  protected readonly _apiUrl = environment.apiUrl;
  protected readonly _http = inject(HttpClient);
  protected abstract endpoint: string;

  // Generic GET method
  getAll(filters?: T | undefined, params?: HttpParams): Observable<T[]> {
    if (filters) {
      params = this._setFilters(params, filters);
    }
    return this._http.get<T[]>(`${this._apiUrl}/${this.endpoint}`, { params });
  }

  // Generic GET method
  getById(id: string | number, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${this._apiUrl}/${this.endpoint}/${id}`, {
      params,
    });
  }

  // Generic POST method
  create(body: T): Observable<T> {
    return this._http.post<T>(`${this._apiUrl}/${this.endpoint}`, body);
  }

  // Generic PUT method
  update(id: string | number, body: T): Observable<T> {
    return this._http.put<T>(`${this._apiUrl}/${this.endpoint}/${id}`, body);
  }

  // Generic DELETE method
  delete(id: string | number, params?: HttpParams): Observable<T> {
    return this._http.delete<T>(`${this._apiUrl}/${this.endpoint}/${id}`, {
      params,
    });
  }

  private _setFilters<U extends object>(
    params: HttpParams | undefined,
    filters: U,
  ): HttpParams | undefined {
    if (!params) {
      params = new HttpParams();
    }
    Object.keys(filters).forEach((key) => {
      const value = (filters as Record<string, any>)[key];
      if (value !== undefined) {
        params = (params ?? new HttpParams()).set(key, value);
      }
    });
    return params;
  }
}
