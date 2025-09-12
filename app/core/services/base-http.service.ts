import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class BaseHttpService {
  protected  readonly _apiUrl = environment.apiUrl;
  protected  readonly _http = inject(HttpClient);

  // Generic GET method
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${this._apiUrl}/${endpoint}`, { params });
  }

  // Generic POST method
  post<T>(endpoint: string, body: any): Observable<T> {
    return this._http.post<T>(`${this._apiUrl}/${endpoint}`, body);
  }

  // Generic PUT method
  put<T>(endpoint: string, body: any): Observable<T> {
    return this._http.put<T>(`${this._apiUrl}/${endpoint}`, body);
  }

  // Generic DELETE method
  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._http.delete<T>(`${this._apiUrl}/${endpoint}`, { params });
  }
}
