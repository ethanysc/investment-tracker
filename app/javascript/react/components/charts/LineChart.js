import React from "react"
import Chart from "react-google-charts"

const options = {
  title: '',
  legend: { position: "right" },
  vAxis: { title: 'Dollar' },
  backgroundColor: "transparent"
};
class LineChart extends React.Component {
  render() {
    return (
      <div className="line-chart">
        <Chart
          chartType="LineChart"
          width="100%"
          height="500px"
          data={this.props.data}
          options={options}
        />
      </div>
    );
  }
}

export default LineChart
