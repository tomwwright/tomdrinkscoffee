import React from "react";
import { Doughnut } from "react-chartjs-2";

type DoughnutGraphProps = {
  data: Array<{
    amount: number;
    colour: string;
    label: string;
  }>;
};

export const DoughnutGraph: React.StatelessComponent<DoughnutGraphProps> = ({ data }) => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: data.map((d) => d.amount),
            backgroundColor: data.map((d) => d.colour),
          },
        ],

        labels: data.map((d) => d.label),
      }}
    />
  );
};
