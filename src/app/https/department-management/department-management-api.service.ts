import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { APP_CONFIG } from '@vks/environments/environment';
import { IBaseResponse } from '../base-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentManagementApiService {
  baseUrl = 'https://67dd0d51e00db03c4069f897.mockapi.io/IDepartmentInfo';
  constructor(private http: HttpClient) {}

  getListDepartment<T>(): Observable<T>;
  getListDepartment<T>(rawResponse: true): Observable<IBaseResponse<T>>;
  getListDepartment<T>(rawResponse: boolean = false): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      map((response) => {
        if (rawResponse) {
          return response as IBaseResponse<T>;
        } else {
          return response as T;
        }
      })
    );
  }

  createDepartment<T>(data: any): Observable<T> {
    return this.http.post(this.baseUrl, data).pipe(
      map((response) => {
        return response as T;
      })
    );
  }

  updateDepartment<T>(id: any, data: any): Observable<T> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => {
        return response as T;
      })
    );
  }

  deteleDepartment<T>(id: any): Observable<T> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map((response) => {
        return response as T;
      })
    );
  }
}
