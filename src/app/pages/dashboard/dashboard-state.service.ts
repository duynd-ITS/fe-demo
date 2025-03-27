import { Injectable } from '@angular/core';
import { IDepartmentInfo } from '../department-management/models';
@Injectable()
export class DashboardStateService {
  constructor() {
    const documentStyle = getComputedStyle(document.documentElement);
  }

  getDepartmentStatsByOrganization(employees: IDepartmentInfo[]): {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  } {
    // Collect all unique organization names
    const orgNames = Array.from(
      new Set(employees.map((emp) => emp.organizationName))
    );

    // Group counts by department then organization
    const deptMap = new Map<string, Map<string, number>>();
    employees.forEach((emp) => {
      if (!deptMap.has(emp.departmentId)) {
        deptMap.set(emp.departmentId, new Map());
      }
      const orgMap = deptMap.get(emp.departmentId)!;
      orgMap.set(
        emp.organizationName,
        (orgMap.get(emp.organizationName) || 0) + 1
      );
    });

    // Build datasets structure for stacked chart
    const datasets = Array.from(deptMap.entries()).map(
      ([departmentId, orgMap]) => {
        const data = orgNames.map((org) => orgMap.get(org) || 0);
        return {
          label: departmentId,
          data,
        };
      }
    );

    return {
      labels: orgNames,
      datasets,
    };
  }

  public getRoleStatsByOrganization(employees: IDepartmentInfo[]): {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  } {
    const orgNames = Array.from(
      new Set(employees.map((emp) => emp.organizationName))
    );

    const roleMap = new Map<string, Map<string, number>>();
    employees.forEach((emp) => {
      if (!roleMap.has(emp.roleId)) {
        roleMap.set(emp.roleId, new Map());
      }
      const orgMap = roleMap.get(emp.roleId)!;
      orgMap.set(
        emp.organizationName,
        (orgMap.get(emp.organizationName) || 0) + 1
      );
    });

    const datasets = Array.from(roleMap.entries()).map(([roleId, orgMap]) => {
      const data = orgNames.map((org) => orgMap.get(org) || 0);
      return {
        label: roleId,
        data,
      };
    });

    return {
      labels: orgNames,
      datasets,
    };
  }

  public getDepartmentCounts(employees: IDepartmentInfo[]): {
    labels: string[];
    data: number[];
  } {
    const departmentCounts = new Map<string, number>();

    // Tally employees by department
    employees.forEach((emp) => {
      departmentCounts.set(
        emp.departmentId,
        (departmentCounts.get(emp.departmentId) || 0) + 1
      );
    });

    return {
      labels: Array.from(departmentCounts.keys()),
      data: Array.from(departmentCounts.values()),
    };
  }

  public getRoleCounts(employees: IDepartmentInfo[]): {
    labels: string[];
    data: number[];
  } {
    const roleCounts = new Map<string, number>();

    // Tally employees by role
    employees.forEach((emp) => {
      roleCounts.set(emp.roleId, (roleCounts.get(emp.roleId) || 0) + 1);
    });

    return {
      labels: Array.from(roleCounts.keys()),
      data: Array.from(roleCounts.values()),
    };
  }
}
