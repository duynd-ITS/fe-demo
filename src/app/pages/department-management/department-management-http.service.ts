import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import {
  IDepartmentInfo,
  IDepartmentForm,
  IDepartmentData,
} from '@vks/app/pages/department-management/models';
import { DepartmentManagementApiService } from '@vks/app/https/department-management/department-management-api.service';
@Injectable()
export class DepartmentManagementHttpService {
  constructor(
    private departmentManagementApiService: DepartmentManagementApiService
  ) {}

  // [GET]
  getListDepartment(): Observable<IDepartmentInfo[]> {
    return this.departmentManagementApiService.getListDepartment<
      IDepartmentInfo[]
    >();
  }

  // [POST]
  createDepartment(data: IDepartmentData): Observable<IDepartmentInfo> {
    return this.departmentManagementApiService.createDepartment<IDepartmentInfo>(
      data
    );
  }

  // [PUT]
  updateDepartment(
    id: any,
    data: IDepartmentData
  ): Observable<IDepartmentInfo> {
    return this.departmentManagementApiService.updateDepartment<IDepartmentInfo>(
      id,
      data
    );
  }

  // [DELETE]
  deleteDepartment(id: any): Observable<IDepartmentInfo> {
    return this.departmentManagementApiService.deteleDepartment<IDepartmentInfo>(
      id
    );
  }
}
