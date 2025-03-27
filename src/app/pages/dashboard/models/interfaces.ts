export interface IInterfaces {}

export interface IChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface ICountData {
  labels: string[];
  data: number[];
}
