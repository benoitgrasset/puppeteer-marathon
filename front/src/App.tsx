import React from "react";
import "./App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import dataJSON from "./data3.json";

const dataToDisplay = [
  ...dataJSON.map((e) => [Object.entries(e)[0][1], Object.entries(e)[1][1]]),
];

const App = () => {
  const options = {
    title: {
      text: "My stock chart",
    },
    chart: {
      type: "spline",
    },
    series: [{ data: dataToDisplay, lineWidth: 0.5 }],
  };

  return (
    <div className="App">
      front
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default App;
