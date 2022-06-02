import React from "react";
import "./app.css";
import View from "./components/layout/View";
import ParentWrapper from "./components/hoc/ParentWrapper";
import Heading from "./components/layout/Heading";

const App = () => {
  return (
    <View>
      <Heading level={1} title={"Pricing Matrix"} />
      <ParentWrapper />
    </View>
  );
};

export default App;
