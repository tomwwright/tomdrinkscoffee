import React from "react";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AppAppBar from "./modules/views/AppAppBar";
import ProductHero from "./modules/views/ProductHero";
import AppFooter from "./modules/views/AppFooter";
import CoffeeSection from "./modules/views/CoffeeSection";
import withRoot from "./modules/withRoot";

Amplify.configure(awsconfig);

function App() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <CoffeeSection />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(App);
