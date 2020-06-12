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

export function constructDoughnutGraphData(data: Coffee[]) {
  const descriptionMapping = {
    "SQ *COFFEE PLUS OF": "Coffee + Office",
    "SQ *LITTLE TEMPERANC": "Little Temperance",
    "7-ELEVEN": "7-Eleven",
    "DIRTY APRON": "Dirty Apron",
  };

  const groupedByLabel = _.groupBy(data, (coffee) => {
    for (const d of Object.entries(descriptionMapping)) {
      if (coffee.description.startsWith(d[0])) return d[1];
    }
    return "Unknown";
  });

  const labels = Object.keys(groupedByLabel);

  const valuesMapping: { [key: string]: any } = {
    "Coffee + Office": {
      colour: "rgba(0, 0, 255, 0.4)",
    },
    "Little Temperance": {
      colour: "rgba(255, 0, 0, 0.4)",
    },
    "7-Eleven": {
      colour: "rgba(0, 255, 0, 0.4)",
    },
    "Dirty Apron": {
      colour: "rgba(255, 150, 0, 0.4)",
    },
  };

  return labels.map((label) => ({
    amount: groupedByLabel[label].length,
    label: label,
    colour: valuesMapping[label].colour,
  }));
}
