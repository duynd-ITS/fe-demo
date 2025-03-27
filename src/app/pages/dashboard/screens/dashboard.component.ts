import { Component, OnInit } from '@angular/core';
import { ConfigHeader } from '@vks/app/pages/account-management/models';
import { IAccountInfo } from '@vks/app/https/account-management/interfaces';
import {
  centerTextPlugin,
  branchedLegendPlugin,
  chartValuePlugin,
} from '@vks/app/pages/dashboard/models';
import { DepartmentManagementHttpService } from '@vks/app/pages/department-management/department-management-http.service';
import { DashboardStateService } from '../dashboard-state.service';
import { IChartData, ICountData } from '../../dashboard/models/interfaces';
@Component({
  selector: 'vks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly title = 'Danh sách tài khoản';
  readonly configHeader = ConfigHeader;
  readonly centerTextPlugin = centerTextPlugin;
  readonly branchedLegendPlugin = branchedLegendPlugin;
  readonly chartValuePlugin = chartValuePlugin;
  departmentChartData: IChartData = {
    labels: [],
    datasets: [],
  };
  roleChartData: IChartData = {
    labels: [],
    datasets: [],
  };
  departmentCounts: ICountData = {
    labels: [],
    data: [],
  };
  roleCounts: ICountData = {
    labels: [],
    data: [],
  };
  constructor(
    private departmentManagementHttpService: DepartmentManagementHttpService,
    private dashboardStateService: DashboardStateService
  ) {}

  ngOnInit(): void {
    this.departmentManagementHttpService
      .getListDepartment()
      .subscribe((res) => {
        this.departmentChartData =
          this.dashboardStateService.getDepartmentStatsByOrganization(res);
        this.roleChartData =
          this.dashboardStateService.getRoleStatsByOrganization(res);
        this.departmentCounts =
          this.dashboardStateService.getDepartmentCounts(res);
        this.roleCounts = this.dashboardStateService.getRoleCounts(res);
      });
  }
}
