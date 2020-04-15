import React from "react";
import "./App.css";
import _ from "lodash";
import dayjs from "dayjs";

import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import awsconfig from "./aws-exports";

import { Line } from "react-chartjs-2";
import { IConnectState } from "aws-amplify-react/lib-esm/API/GraphQL/Connect";

type Coffee = {
  datetime: string;
  description: string;
  amount: number;
};

Amplify.configure(awsconfig);

const listCoffeesQuery = `query listCoffees {
  listCoffees {
    items {
      datetime
      description
      amount
    }
  }
}`;

function constructChartData(data: Coffee[]): any {
  const sorted = _.sortBy(data, (coffee) => coffee.datetime);
  const sortedWithMonth = sorted.map((coffee) => {
    return {
      ...coffee,
      month: dayjs(coffee.datetime).startOf("month").toISOString(),
    };
  });

  const groupedByMonth = _.sortBy(_.entries(_.groupBy(sortedWithMonth, "month")), (entry) => entry[0]).map((entry) => ({ month: entry[0], count: entry[1].length }));

  return {
    labels: groupedByMonth.map((group) => dayjs(group.month).format("MMM YYYY")),
    datasets: [
      {
        label: "Coffee",
        fill: true,
        data: groupedByMonth.map((group) => group.count),
      },
    ],
  };
}

function App() {
  return (
    <div className="App">
      <h1>Tom drinks Coffee</h1>
      <Connect query={graphqlOperation(listCoffeesQuery)}>
        {(result: IConnectState) => {
          return (
            <div>
              <p>{JSON.stringify(result)}</p>
              <p>{result.loading ? "loading..." : JSON.stringify(constructChartData(result.data.listCoffees.items))}</p>
              {result.loading ? (
                <h3>loading ...</h3>
              ) : (
                <Line
                  data={constructChartData(result.data.listCoffees.items)}
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
              )}
            </div>
          );
          // if (result.errors) return <h3>Error</h3>;
          // if (result.loading || !result.data) return <h3>Loading...</h3>;
        }}
      </Connect>
    </div>
  );
}

export default App;
