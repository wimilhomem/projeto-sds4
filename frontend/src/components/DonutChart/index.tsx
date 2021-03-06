import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { TSaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
type TCharData = {
  labels: string[];
  series: number[];
}

const DonutChart = () => {

  const [chartData, setChartData] = useState<TCharData>({ labels: [], series: [] });


  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
      .then(response => {
        const data = response.data as TSaleSum[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => x.sum);

        setChartData({ labels: myLabels, series: mySeries });
        console.log("response", chartData);
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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