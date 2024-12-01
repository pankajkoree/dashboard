import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartJSOrUndefined,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GradientBarChart: React.FC = () => {
  const chartRef = useRef<ChartJSOrUndefined<"bar", number[], string>>(null); // Correct type

  const data: ChartData<"bar", number[], string> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Activity",
        data: [100, 150, 200, 250, 300, 150, 200, 350, 300, 400, 450, 500],
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(33, 150, 243, 0.2)");
          gradient.addColorStop(1, "rgba(33, 150, 243, 1)");
          return gradient;
        },
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Activity",
        align: "start",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          borderColor: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          stepSize: 100,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px", margin: "0 auto" }}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default GradientBarChart;
