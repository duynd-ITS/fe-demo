import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { DepartmentManagementStateService } from './department-management-state.service';
import { DepartmentManagementHttpService } from './department-management-http.service';
import { DepartmentManagementComponent } from './screens/department-management.component';
import { FilterCommonComponent } from '@vks/app/shared/ui-common/filter-common/filter-common.component';
import { TableCommonComponent } from '@vks/app/shared/ui-common/table-common/table-common.component';
import { ToastModule } from 'primeng/toast';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { FormDepartmentComponent } from '@vks/app/pages/department-management/screens/components/form-department/form-department.component';
import { NotificationService } from '@vks/app/services';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [DepartmentManagementComponent, FormDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
    ButtonDirective,
    ToastModule,
    RippleModule,
    ButtonModule,
    FilterCommonComponent,
    TableCommonComponent,
    MenuModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    DropdownModule,
    PasswordModule,
  ],
  providers: [
    DepartmentManagementStateService,
    DepartmentManagementHttpService,
    NotificationService,
  ],
})
export class DepartmentManagementModule {}
