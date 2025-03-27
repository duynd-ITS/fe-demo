import {
  Chart,
  Plugin,
  ArcElement,
  ChartType,
  ChartConfiguration,
} from 'chart.js';

export const centerTextPlugin: Plugin = {
  id: 'centerTextPlugin',
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { top, left, width, height },
    } = chart;
    const total =
      (chart.data.datasets?.[0]?.data as number[])?.reduce(
        (acc, val) => acc + val,
        0
      ) || 0;
    ctx.save();
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(String(total) + ' Total', left + width / 2, top + height / 2);
  },
};

export const branchedLegendPlugin: Plugin = {
  id: 'branchedLegendPlugin',
  afterDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data) return;

    meta.data.forEach((arc, index) => {
      // Cast 'arc' to ArcElement so TS recognizes the arc-specific properties
      const arcElement = arc as ArcElement;
      const angle = (arcElement.startAngle + arcElement.endAngle) / 2;
      const r = (arcElement.outerRadius + arcElement.innerRadius) / 2;

      const xCenter =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCenter =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2;

      const xArc = xCenter + r * Math.cos(angle);
      const yArc = yCenter + r * Math.sin(angle);

      const offset = 60;
      const xLabel = xCenter + (r + offset) * Math.cos(angle);
      const yLabel = yCenter + (r + offset) * Math.sin(angle);

      ctx.save();
      ctx.strokeStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(xArc, yArc);
      ctx.lineTo(xLabel, yLabel);
      ctx.stroke();

      const label = chart.data.labels?.[index] ?? '';
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(label), xLabel, yLabel);
      ctx.restore();
    });
  },
};

export const chartValuePlugin: Plugin = {
  id: 'chartValuePlugin',
  afterDatasetsDraw(chart: Chart) {
    const { ctx } = chart;
    const chartConfig = chart.config as ChartConfiguration<ChartType>;
    const chartType = chartConfig.type; // Now recognized as a valid property
    const datasets = chart.data.datasets || [];

    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((element, index) => {
        const value = dataset.data[index] ?? '';
        // Provide an object argument to tooltipPosition()
        const position = element.tooltipPosition(true);

        // Adjust offset if it's doughnut or pie
        let offsetY = -5;
        if (chartType === 'doughnut' || chartType === 'pie') {
          offsetY = 0;
        }

        ctx.save();
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(value), position.x, position.y + offsetY);
        ctx.restore();
      });
    });
  },
};
