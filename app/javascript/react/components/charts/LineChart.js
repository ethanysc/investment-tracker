import React from "react"
import Chart from "react-google-charts"

const options = {
  title: '',
  legend: { position: "right" },
  hAxis: {
    slantedText: true,
    slantedTextAngle: 60
  },
  vAxis: { title: 'Dollar' },
  backgroundColor: "transparent",
  explorer: {
        maxZoomOut:2,
        keepInBounds: true
    }
}

class LineChart extends React.Component {
  render() {
    return (
      <Chart
        chartType="LineChart"
        width="100%"
        height="500px"
        data={this.props.data}
        options={options}
      />
    );
  }
}

export default LineChart
