import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config';
import { IFilterForm } from '@vks/app/https/account-management/interfaces';
import {
  actionConfig,
  ITableHeaderConfig,
} from '@vks/app/shared/ui-common/table-common/table.common.config';
import { KeyAction } from '@vks/app/shared/models';
import { DepartmentCode, RoleAccount } from '@vks/app/shared/models';
//List Account config
export const DefaultFilterData: IFilterForm = {
  username: '',
  fullName: '',
  roleId: 0,
  roleName: '',
  departmentId: 0,
  departmentName: '',
  organizationId: 0,
  organizationName: '',
  status: '',
  fromDate: '',
  toDate: '',
};

export const ListAccountActionConfig: actionConfig[] = [
  { label: 'Cập nhật', icon: 'pi pi-file-edit', key: KeyAction.UPDATE },
  { label: 'Xoá', icon: 'pi pi-trash', key: KeyAction.REMOVE },
];

export const FilterConfig: FilterFieldConfig[] = [
  {
    type: 'select',
    label: 'Mã phòng ban',
    name: 'departmentId',
    options: Object.values(DepartmentCode).map((code) => ({
      label: code,
      value: code,
    })),
    placeholder: 'Nhập mã phòng ban',
    col: 3,
  },
  {
    type: 'text',
    label: 'Tên nhân viên',
    name: 'fullName',
    placeholder: 'Nhập tên nhân viên',
    col: 3,
  },
  {
    type: 'select',
    label: 'Vị trí',
    name: 'roleId',
    options: Object.values(RoleAccount).map((role) => ({
      label: role,
      value: role,
    })),
    placeholder: 'Vị trí',
    col: 3,
  },
  {
    type: 'text',
    label: 'Đơn vị',
    name: 'organizationName',
    options: [],
    placeholder: 'Nhập đơn vị',
    col: 3,
  },
];

export const ConfigHeader: ITableHeaderConfig[] = [
  {
    key: 'stt',
    name: 'STT',
  },
  {
    key: 'departmentId',
    name: 'Mã phòng ban',
  },
  {
    key: 'departmentId',
    name: 'Tên phòng ban',
    pipe: 'vks-format-department',
  },
  {
    key: 'fullName',
    name: 'Tên nhân viên',
  },
  {
    key: 'roleId',
    name: 'Vị trí',
    pipe: 'vks-format-role',
  },
  {
    key: 'organizationName',
    name: 'Đơn vị',
  },
  {
    key: 'createdDate',
    name: 'Ngày tạo',
    pipe: 'date',
  },
  {
    key: 'updatedDate',
    name: 'Ngày cập nhật',
    pipe: 'date',
  },
  {
    key: 'actions',
    name: 'Thao tác',
  },
];
//List Account config
