import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ConfigHeader,
  DefaultFilterData,
  FilterConfig,
  formMode,
  IDepartmentData,
  IDepartmentForm,
  IDepartmentInfo,
  ListAccountActionConfig,
} from '@vks/app/pages/department-management/models';
import {
  IAccountInfo,
  IFilterForm,
} from '@vks/app/https/account-management/interfaces';
import {
  DEFAULT_TABLE_PAGE,
  DEFAULT_TABLE_SIZE,
  ICategoryItem,
  KeyAction,
  KeyCategory,
  RoleAccount,
} from '@vks/app/shared/models';
import {
  CategoryService,
  LoadingService,
  UserInfoService,
} from '@vks/app/services';
import { FormatDatePipe } from '@vks/app/shared/pipe';
import { actionConfig } from '@vks/app/shared/ui-common/table-common/table.common.config';
import { PaginatorState } from 'primeng/paginator';
import { DepartmentManagementHttpService } from '@vks/app/pages/department-management/department-management-http.service';

@Component({
  selector: 'vks-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss',
  providers: [FormatDatePipe],
})
export class DepartmentManagementComponent implements OnInit {
  readonly title = 'Danh sách phòng ban';
  readonly filterConfig = FilterConfig;
  readonly configHeader = ConfigHeader;
  defaultFilterData = DefaultFilterData;

  readonly KeyAction = KeyAction;

  totalRecords = 0;
  currentActivePage = 1;
  page = DEFAULT_TABLE_PAGE;
  pageSize = DEFAULT_TABLE_SIZE;
  actionConfig = [...ListAccountActionConfig];
  isVisibleModal = false;
  modalMode: formMode = formMode.CREATE;
  selectedDepartment: IDepartmentForm = {
    id: 0,
    departmentId: '',
    departmentName: '',
    roleName: '',
    organizationName: '',
  };

  listDepartment: IDepartmentInfo[] = [];

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private userInfoServive: UserInfoService,
    private categoryService: CategoryService,
    private fomatDate: FormatDatePipe,
    private departmentManagementHttpService: DepartmentManagementHttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      // Always fetch the latest data
      this.departmentManagementHttpService
        .getListDepartment()
        .subscribe((res) => {
          if (this.router.url.includes('/filter')) {
            this.listDepartment = res.filter((item) =>
              Object.keys(params).every((key) =>
                (item as any)[key]?.includes(params[key])
              )
            );
          } else {
            // If not in /filter route, just load the entire list
            this.listDepartment = res;
          }
        });
    });
    // combineLatest([
    //   this.userInfoServive.userInfo$,
    //   this.categoryService.listCategories$,
    // ]).subscribe(([user, category]) => {
    //   if (!user || !category) return;
    //   // console.log(user, category)
    //   const isAdmin = user.roleCode === RoleAccount.IT_ADMIN;
    //   const isVienTruong = user.roleCode === RoleAccount.VIEN_TRUONG;
    //   const isVienPho = user.roleCode === RoleAccount.VIEN_PHO;
    //   const isSuper = isAdmin || isVienTruong || isVienPho;
    //   this.filterConfig.map((config) => {
    //     if (config.name === 'roleId') {
    //       const allRole = category[KeyCategory.ROLE];
    //       const availableRoles = isSuper
    //         ? allRole
    //         : allRole.filter((item) =>
    //             [
    //               RoleAccount.TRUONG_PHONG,
    //               RoleAccount.PHO_PHONG,
    //               RoleAccount.KIEM_SAT_VIEN,
    //             ].includes(item.code as RoleAccount)
    //           );
    //       config.options = this.handleUpdateFilterConfig(availableRoles);
    //     }
    //     if (config.name === 'departmentId') {
    //       const allDepartment = category[KeyCategory.DEPARTMENT];
    //       const userDepartment = allDepartment.find(
    //         (item) => item.code === user.departmentCode
    //       )!;
    //       const availableDepartment = isSuper
    //         ? allDepartment
    //         : [userDepartment];
    //       config.options = this.handleUpdateFilterConfig(availableDepartment);
    //     }
    //     if (config.name === 'organizationId') {
    //       config.options = this.handleUpdateFilterConfig(
    //         category[KeyCategory.ORGANIZATION]
    //       );
    //     }
    //   });
    // });
    // this.handleGetAccountManagement();
    // this.actionConfig = this.actionConfig.map((action) => {
    //   if (action.key === KeyAction.UPDATE) {
    //     return {
    //       ...action,
    //       command: (item: any) => {
    //         // this.onEdit(item),
    //         console.log(item);
    //       },
    //     };
    //   }
    //   if (action.key === KeyAction.REMOVE) {
    //     return {
    //       ...action,
    //       command: (item: any) => {
    //         // this.onDelete(item);
    //         console.log(item);
    //       },
    //     };
    //   }
    //   return action;
    // });
    // this.accountManagementHttpService.getListAccount().subscribe((res) => {
    //   this.listAccount = res;
    // });
  }

  getActionConfig(item: IDepartmentInfo): actionConfig[] {
    return this.actionConfig.map((action) => {
      if (action.key === KeyAction.UPDATE) {
        return {
          ...action,
          command: () => this.onEdit(item),
        };
      }
      if (action.key === KeyAction.REMOVE) {
        return {
          ...action,
          command: () => this.onRemove(item),
        };
      }
      return action;
    });
  }

  isDisableRemoveButton(itemActionConfig: actionConfig): boolean {
    return itemActionConfig.key === KeyAction.REMOVE;
  }

  handleUpdateFilterConfig(arrCategory: ICategoryItem[]) {
    return (
      !!arrCategory &&
      arrCategory.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    );
  }

  onPageChange(page: PaginatorState) {
    // console.log('page', page)
    // this.page = page.page! + 1
    // this.pageSize = page.rows!
    // this.handleGetAccountManagement()
  }

  onSearch(data: any) {
    // console.log('Dữ liệu search', data)
    // this.defaultFilterData.fullName = data
    // this.handleGetAccountManagement()
  }

  // Trigger creating a filter route with query parameters
  onFilter(filter: IFilterForm) {
    this.router.navigate(['vks/department-management', 'filter'], {
      queryParams: filter,
    });
  }

  // Clear filter and return to the main route
  onClearFilter(event: any) {
    this.router.navigate(['vks/department-management']);
    this.departmentManagementHttpService
      .getListDepartment()
      .subscribe((res) => (this.listDepartment = res));
  }

  onEdit(item: IDepartmentInfo) {
    console.log('Dữ liệu edit', item);
    this.isVisibleModal = true;
    this.modalMode = formMode.EDIT;
    this.selectedDepartment = item;
  }

  onOpenModal() {
    this.modalMode = formMode.CREATE;
    this.isVisibleModal = true;
    // console.log('open modal');
  }

  onCloseModal() {
    this.isVisibleModal = false;
    // console.log('close modal');
  }

  onDoubleClickRow(item: IDepartmentInfo) {
    // void this.router.navigate([ERoute.ACCOUNT_MANAGEMENT + '/detail'], {
    //     queryParams: { accountId: item.id },
    // })
    console.log('double click row', item);
  }

  onRemove(item: IDepartmentInfo) {
    // remove department by api
    this.departmentManagementHttpService
      .deleteDepartment(item.id)
      .subscribe()
      .add(() => {
        // remove department from listDepartment
        // this.listDepartment = this.listDepartment.filter(
        //   (department) => department.id !== item.id
        // );
        this.departmentManagementHttpService
          .getListDepartment()
          .subscribe((res) => {
            this.listDepartment = res;
          });
      });
    // // remove department from listDepartment
    // this.listDepartment = this.listDepartment.filter(
    //   (department) => department.id !== item.id
    // );
  }

  onSubmit(formData: IDepartmentForm) {
    console.log('formData', formData);
    if (this.modalMode === formMode.CREATE) {
      const newDepartment: IDepartmentData = {
        ...formData,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };
      this.departmentManagementHttpService
        .createDepartment(newDepartment)
        .subscribe()
        .add(() => {
          this.departmentManagementHttpService
            .getListDepartment()
            .subscribe((res) => {
              this.listDepartment = res;
            });
          this.isVisibleModal = false;
        });
    } else {
      console.log('update::', formData);
      const updateDepartment: IDepartmentData = {
        ...formData,
        updatedDate: new Date().toISOString(),
      };
      this.departmentManagementHttpService
        .updateDepartment(this.selectedDepartment.id, updateDepartment)
        .subscribe()
        .add(() => {
          this.departmentManagementHttpService
            .getListDepartment()
            .subscribe((res) => {
              this.listDepartment = res;
            });
          this.isVisibleModal = false;
        });
      this.isVisibleModal = false;
    }
  }

  handleGetAccountManagement() {}
}
