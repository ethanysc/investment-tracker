import React from 'react'

class PortfolioIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {}

    this.timeOfDay = this.timeOfDay.bind(this)
  }

  timeOfDay(){
    let currentTime = new Date()
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
      </div>
    )
  }
}

export default PortfolioIndexContainer
