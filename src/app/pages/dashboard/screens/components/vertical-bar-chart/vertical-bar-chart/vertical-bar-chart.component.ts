import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

@Component({
  selector: 'vks-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrl: './vertical-bar-chart.component.scss',
})
export class VerticalBarChartComponent implements OnInit, OnChanges {
  data: any;
  @Input() data2: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
  options: any;

  @Input() title: string = 'Vertical Bar Chart';
  @Input() isStacked: boolean = false;
  @Input() indexAxis: 'x' | 'y' = 'x';

  private backgroundColors = [
    '--blue-500',
    '--pink-500',
    '--green-500',
    '--orange-500',
    '--teal-500',
    '--purple-500',
  ];

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: this.data2.labels,
      datasets: this.data2.datasets.map((dataset, index) => {
        const color = documentStyle.getPropertyValue(
          this.backgroundColors[index % this.backgroundColors.length]
        );
        return {
          ...dataset,
          backgroundColor: color,
          borderColor: color,
        };
      }),
    };

    this.options = {
      indexAxis: this.indexAxis,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
          position: 'bottom',
        },
      },
      scales: {
        x: {
          stacked: this.isStacked,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: this.isStacked,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data2) {
      this.data = {
        labels: this.data2.labels,
        datasets: this.data2.datasets.map((dataset, index) => {
          const color = getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            this.backgroundColors[index % this.backgroundColors.length]
          );
          return {
            ...dataset,
            backgroundColor: color,
            borderColor: color,
          };
        }),
      };
    }
  }
}
