import React from 'react'

import StocksIndexTile from '../../components/stocks/StocksIndexTile'

class StocksIndexContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      myStocks: [],
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
        this.setState({ myStocks: body })
      }
      else {
        this.setState({ errors: this.state.errors.concat(body) })
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
    let myStocks = ''
    if (this.state.myStocks.length > 0) {
      myStocks = this.state.myStocks.map((stock) => {
        return(
          <StocksIndexTile
            key={stock.symbol}
            stock={stock}
          />
        )
      })
    }
    return(
      <div className='porfolio-index-wrapper row'>
        <div className='columns'>
          <h1>{this.timeOfDay()}Welcome to InvestmentTracker</h1>
          <div className='distribution-chart'>Distribution Chart</div>
          <div className='investment-line-graph'>Investment Line Graph</div>
          <div className='stocks-list'>List of Stock Investments</div>
          {myStocks}
        </div>
      </div>
    )
  }
}

export default StocksIndexContainer
