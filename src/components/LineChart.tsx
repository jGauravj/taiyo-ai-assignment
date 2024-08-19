import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register necessary components with ChartJS
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

type HistoricalData = {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
};

function LineChart() {
  const { data, isLoading, error } = useQuery<HistoricalData, Error>({
    queryKey: ["covidData"],
    queryFn: async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = {
    labels: Object.keys(data!.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data!.cases),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Deaths",
        data: Object.values(data!.deaths),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
      },
      {
        label: "Recovered",
        data: Object.values(data!.recovered),
        fill: false,
        borderColor: "rgba(153,102,255,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to fill the container
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full h-[35rem] px-6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default LineChart;
