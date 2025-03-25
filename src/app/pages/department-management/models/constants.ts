import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config';
import { IFilterForm } from '@vks/app/https/account-management/interfaces';
import {
  actionConfig,
  ITableHeaderConfig,
} from '@vks/app/shared/ui-common/table-common/table.common.config';
import { KeyAction } from '@vks/app/shared/models';

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
    type: 'text',
    label: 'Mã phòng ban',
    name: 'departmentId',
    placeholder: 'Nhập mã phòng ban',
    col: 3,
  },
  {
    type: 'text',
    label: 'Tên phòng ban',
    name: 'departmentName',
    placeholder: 'Nhập tên phòng ban',
    col: 3,
  },
  {
    type: 'text',
    label: 'Tên trưởng phòng',
    name: 'roleName',
    options: [],
    placeholder: 'Nhập tên trưởng phòng',
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
  // {
  //   type: 'date',
  //   label: 'Từ ngày',
  //   name: 'fromDate',
  //   placeholder: 'Lọc từ ngày',
  //   action: KeyAction.SELECT_DATE_FROM_TO,
  //   col: 3,
  // },
  // {
  //   type: 'date',
  //   label: 'Đến ngày',
  //   name: 'toDate',
  //   placeholder: 'Lọc đến ngày',
  //   action: KeyAction.SELECT_DATE_TO,
  //   col: 3,
  // },
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
    key: 'departmentName',
    name: 'Tên phòng ban',
  },
  {
    key: 'roleName',
    name: 'Trưởng phòng',
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
