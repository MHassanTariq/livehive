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
import { TypedSheets } from "../../store/services/types";
import { convertTypedDataToGraphData } from "../../store/adapterFunctions";

interface Props {
  typedSheet: TypedSheets;
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

const GraphsView = ({ typedSheet }: Props) => {
  function getHeaderObject(title: string) {
    return {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
      },
    };
  }

  const { labels, data, headers } = convertTypedDataToGraphData(typedSheet);

  return (
    <Bar
      style={graphStyles}
      data={{
        labels: labels,
        datasets: data,
      }}
      options={{
        plugins: {
          legend: {
            labels: { font: { size: 20, weight: "bold" } },
          },
        },
        scales: {
          y: getHeaderObject(headers.y),
          x: getHeaderObject(headers.x),
        },
      }}
    />
  );
};
export default GraphsView;
