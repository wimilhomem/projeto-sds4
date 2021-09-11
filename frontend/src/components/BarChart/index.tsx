import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { TSaleSucess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type TSeriesData = {
  name: string;
  data: number[];
}
type TChartData = {
  labels: {
    categories: string[];
  };
  series: TSeriesData[];
}

const BarChart = () => {
  const [chartData, setChartData] = useState<TChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/sucess-by-seller`)
      .then(response => {
        const data = response.data as TSaleSucess[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => round(100.0 * (x.deals / x.visited), 1));

        setChartData({
          labels: {
            categories: myLabels
          },
          series: [
            {
              name: "% Sucess",
              data: mySeries
            }
          ]
        });
        console.log("response", chartData);
      });


  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />

  );
}

export default BarChart;