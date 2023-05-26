import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { TypedSheets } from "../../store/types";

interface Props {
  sheetData: TypedSheets;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const graphStyles: React.CSSProperties = {
  width: "50%",
  height: "50%",
};

const GraphsView = ({ sheetData }: Props) => {
  return (
    <Bar
      style={graphStyles}
      data={{
        labels: ["Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "id 1",
            data: [5, 6, 7],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "rgb(0,0,0)",
            borderWidth: 1,
          },
          {
            label: "id 2",
            data: [3, 2, 1],
          },
          {
            label: "id 3",
            data: [3, 2],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: { font: { size: 20, weight: "bold" } },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "People",
              font: {
                size: 16,
                weight: "bold",
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Regions",
              font: {
                size: 16,
                weight: "bold",
              },
            },
          },
        },
      }}
    />
  );
};
export default GraphsView;
