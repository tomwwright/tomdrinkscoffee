import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../../components/Typography";

import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { IConnectState } from "aws-amplify-react/lib-esm/API/GraphQL/Connect";
import { LineGraph } from "../../components/LineGraph";
import { DoughnutGraph } from "../../components/DoughnutGraph";

import { listCoffeesQuery } from "./queries";
import { constructChartData, constructDoughnutGraphData } from "./utils";

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
});

type CoffeeSectionProps = {
  classes: any;
};

const CoffeeSection: React.StatelessComponent<CoffeeSectionProps> = (props) => {
  return (
    <Container className={props.classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Tom Drinks Coffee.
        <Connect query={graphqlOperation(listCoffeesQuery, { limit: 300 })}>
          {(result: IConnectState) => {
            return (
              <React.Fragment>
                {result.loading ? (
                  <h3>loading ...</h3>
                ) : (
                  <React.Fragment>
                    <LineGraph data={constructChartData(result.data.listCoffees.items)} />
                    <DoughnutGraph data={constructDoughnutGraphData(result.data.listCoffees.items)} />
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          }}
        </Connect>
      </Typography>
    </Container>
  );
};

export default withStyles(styles)(CoffeeSection);
