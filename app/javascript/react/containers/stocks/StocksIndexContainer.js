import React from 'react'

class StocksIndexContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      errors: []
    }
    this.timeOfDay = this.timeOfDay.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/stocks.json', {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body){
        this.setState({ stocks: body })
      }
      else {
        this.setState({ errors: errors.concat(body) })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
    let stocks = ''
    if (this.state.stocks.length > 0) {
      stocks = this.state.stocks.map((stock) => {
        return(
          <li>
          </li>
        )
      })
    }
    return(
      <div className='porfolio-index-wrapper'>
        <h1>{this.timeOfDay()}Welcome to InvestmentTracker</h1>
        <div className='distribution-chart'>Distribution Chart</div>
        <div className='investment-line-graph'>Investment Line Graph</div>
        <div className='stocks-list'>List of Stock Investments</div>

      </div>
    )
  }
}

export default StocksIndexContainer
