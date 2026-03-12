import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultChart = ({ results }) => {
  const data = {
    labels: results.map((x) => x.name),
    datasets: [
      {
        label: 'Votes',
        data: results.map((x) => x.votes),
        backgroundColor: '#0d6efd'
      }
    ]
  };

  return <Bar data={data} />;
};

export default ResultChart;
