import React from 'react'

class PortfolioIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {}

    this.timeOfDay = this.timeOfDay.bind(this)
  }

  timeOfDay(){
    let currentTime = new Date().getHours()
    if (currentTime < 12){
      return 'Good Morning, '
    }
    else if (currentTime < 18){
      return 'Good Afternoon, '
    }
    else{
      return 'Good Evening, '
    }
  }

  render(){
    return(
      <div className='porfolio-index-wrapper'>
        <h1>{this.timeOfDay()}Welcome to InvestmentTracker</h1>
        <div className='distribution-chart'>Distribution Chart</div>
        <div className='investment-line-graph'>Investment Line Graph</div>
        <div className='callout'>Apple</div>
        <div className='callout'>Google</div>
        <div className='callout'>Facebook</div>
        <div className='callout'>Microsoft</div>
      </div>
    )
  }
}

export default PortfolioIndexContainer
