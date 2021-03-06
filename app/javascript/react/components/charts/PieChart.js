import React from 'react'
import { Chart } from 'react-google-charts'

const pieOptions = {
  title: "Distribution Chart",
  backgroundColor: "transparent",
  pieHole: 0.4,
  legend: {
    position: "right",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 16
    }
  },
  tooltip: {
    showColorCode: true,
    textStyle:{
      fontSize: 16
    }
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  },
  pieSliceTextStyle: {
    fontSize: 14
  },
  fontName: "Roboto"
};

class PieChart extends React.Component{
  constructor(props){
    super(props)
    this.state = { chartImageURI: '' }
  }
  render(){
    return(
      <div className='pie-chart'>
        <Chart
          chartType='PieChart'
          data={this.props.data}
          options={pieOptions}
          graph_id='PieChart'
          width="100%"
          height="500px"
          legend_toggle
        />
      </div>
    )
  }
}

export default PieChart
