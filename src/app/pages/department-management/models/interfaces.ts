export interface IInterfaces {}

export interface IDepartmentForm {
  id?: number;
  departmentId: string;
  fullName: string;
  roleId: string | null;
  organizationName: string | null;
}

export interface IDepartmentData extends IDepartmentForm {
  createdDate?: string;
  updatedDate: string;
}

export interface IDepartmentInfo {
  id: number;
  departmentId: string;
  fullName: string;
  roleId: string;
  organizationName: string;
  createdDate: string;
  updatedDate: string;
}
