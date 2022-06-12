import React from "react";
import "./App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import data from "./data.json";

const App = () => {
  const options = {
    title: {
      text: "My stock chart",
    },
    chart: {
      type: "spline",
    },
    series: data,
  };

  return (
    <div className="App">
      front
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default App;
