export interface IInterfaces {}

export interface IDepartmentForm {
  id?: number;
  departmentId: string;
  departmentName: string;
  roleName: string | null;
  organizationName: string | null;
  // createdDate?: string;
  // updatedDate?: string;
}

export interface IDepartmentData extends IDepartmentForm {
  createdDate?: string;
  updatedDate: string;
}

export interface IDepartmentInfo {
  id: number;
  departmentId: string;
  departmentName: string;
  roleName: string;
  organizationName: string;
  createdDate: string;
  updatedDate: string;
}
