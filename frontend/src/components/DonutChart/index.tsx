import axios from 'axios';
import Chart from 'react-apexcharts';
import { TSaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
type TCharData = {
  labels: string[];
  series: number[];
}

const DonutChart = () => {

  let chartData: TCharData = { labels: [], series: [] };

  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }
  axios.get(`${BASE_URL}/sales/amount-by-seller`)
    .then(response => {
      const data = response.data as TSaleSum[];
      const myLabels = data.map(x => x.sellerName);
      const mySeries = data.map(x => x.sum);

      chartData = { labels: myLabels, series: mySeries }
      console.log("response", chartData);
    });

  const options = {
    legend: {
      show: true
    }
  }
  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />

  );
}

export default DonutChart;