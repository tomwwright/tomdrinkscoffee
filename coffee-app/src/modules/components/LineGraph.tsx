import React from "react";
import { Line } from "react-chartjs-2";

type LineGraphProps = {
  data: object[];
};

export const LineGraph: React.StatelessComponent<LineGraphProps> = ({ data }) => {
  return (
    <Line
      data={data}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 2,
              },
            },
          ],
        },
      }}
    />
  );
};
