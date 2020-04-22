import dayjs from "dayjs";
import _ from "lodash";

import { Coffee } from "../../types/Coffee";

export function constructChartData(data: Coffee[]): any {
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
