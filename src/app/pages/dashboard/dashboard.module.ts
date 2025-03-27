import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

import { TableCommonComponent } from '../../shared//ui-common/table-common/table-common.component';
import { FilterCommonComponent } from '../../shared/ui-common/filter-common/filter-common.component';
import { DashboardComponent } from './screens/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHttpService } from './dashboard-http.service';
import { DashboardStateService } from './dashboard-state.service';
import { ChartModule } from 'primeng/chart';
import { VerticalBarChartComponent } from './screens/components/vertical-bar-chart/vertical-bar-chart/vertical-bar-chart.component';
import { DoughnutChartComponent } from './screens/components/doughnut-chart/doughnut-chart/doughnut-chart.component';
import { PanelModule } from 'primeng/panel';
import { RankTableComponent } from './screens/components/rank-table/rank-table/rank-table.component';
import { LineChartComponent } from './screens/components/line-chart/line-chart.component';
import { DepartmentManagementHttpService } from '@vks/app/pages/department-management/department-management-http.service';
@NgModule({
  declarations: [
    DashboardComponent,
    VerticalBarChartComponent,
    DoughnutChartComponent,
    RankTableComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableCommonComponent,
    ButtonDirective,
    Button,
    MenuModule,
    ToastModule,
    Ripple,
    FilterCommonComponent,
    ChartModule,
    PanelModule,
  ],
  providers: [
    DashboardHttpService,
    DashboardStateService,
    DepartmentManagementHttpService,
  ],
})
export class DashboardModule {}
