import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ICountData } from '@vks/app/pages/dashboard/models';
import { Chart, Plugin, ArcElement } from 'chart.js';

@Component({
  selector: 'vks-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() dataCount: ICountData = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    data: [300, 50, 100, 40, 120, 80, 30, 40],
  };
  @Input() options: any;
  @Input() title: string = 'Doughnut Chart';
  @Input() plugins: Plugin[] = [];
  @Input() class: any = '';
  @Input() isDisplayLegend = true;
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() isTooltipEnabled = true;
  documentStyle = getComputedStyle(document.documentElement);
  backgroundColors = [
    this.documentStyle.getPropertyValue('--blue-500'),
    this.documentStyle.getPropertyValue('--yellow-500'),
    this.documentStyle.getPropertyValue('--green-500'),
    this.documentStyle.getPropertyValue('--red-500'),
    this.documentStyle.getPropertyValue('--indigo-500'),
    this.documentStyle.getPropertyValue('--cyan-500'),
    this.documentStyle.getPropertyValue('--pink-500'),
    this.documentStyle.getPropertyValue('--purple-500'),
    this.documentStyle.getPropertyValue('--bluegray-500'),
    this.documentStyle.getPropertyValue('--teal-500'),
  ];
  hoverBackgroundColor = [
    this.documentStyle.getPropertyValue('--blue-400'),
    this.documentStyle.getPropertyValue('--yellow-400'),
    this.documentStyle.getPropertyValue('--green-400'),
    this.documentStyle.getPropertyValue('--red-400'),
    this.documentStyle.getPropertyValue('--indigo-400'),
    this.documentStyle.getPropertyValue('--cyan-400'),
    this.documentStyle.getPropertyValue('--pink-400'),
    this.documentStyle.getPropertyValue('--purple-400'),
    this.documentStyle.getPropertyValue('--bluegray-400'),
    this.documentStyle.getPropertyValue('--teal-400'),
  ];
  ngOnInit() {
    // this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.dataCount.labels,
      datasets: [
        {
          data: this.dataCount.data,
          backgroundColor: this.backgroundColors,
          hoverBackgroundColor: this.hoverBackgroundColor,
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        tooltip: { enabled: this.isTooltipEnabled },
        legend: {
          display: this.isDisplayLegend,
          labels: {
            usePointStyle: true,
            color: textColor,
          },
          position: this.legendPosition,
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataCount && !changes.dataCount.firstChange) {
      this.data = {
        labels: this.dataCount.labels,
        datasets: [
          {
            data: this.dataCount.data,
            backgroundColor: this.backgroundColors,
            hoverBackgroundColor: this.hoverBackgroundColor,
          },
        ],
      };
    }
  }
}
