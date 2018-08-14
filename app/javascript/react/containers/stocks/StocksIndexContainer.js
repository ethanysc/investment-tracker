import React from 'react'

import PortfolioIndexTile from '../../components/stocks/PortfolioIndexTile'

class StocksIndexContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      userInfo: [],
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
      if (!body.errors){
        this.setState({
          stocks: this.state.stocks.concat(body.stocks),
          userInfo: this.state.userInfo.concat(body.userInfo)
        })
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
    let myStocks, balance, monthlyContribution = ''
    if (this.state.stocks.length > 0) {
      balance = this.state.userInfo[0].balance
      monthlyContribution = this.state.userInfo[0].monthlyContribution
      myStocks = this.state.stocks.map((stock, index) => {
        return(
          <PortfolioIndexTile
            key={stock.id}
            stock={stock}
            userInfo={this.state.userInfo[index]}
          />
        )
      })
    }

    let errors = ''
    if (this.state.errors.length > 0){
      errors = this.state.errors[0]
    }

    return(
      <div className='porfolio-index-wrapper'>
        <div className='row'>
          <h1>{this.timeOfDay()}Welcome to InvestmentTracker</h1>
        </div>
        <div className='row'>
          <div className='distribution-chart large-4 columns panel callout radius'>
            Distribution Chart
          </div>
          <div className='investment-line-graph large-8 columns panel callout radius'>
            Investment Line Graph
          </div>
        </div>
        <div className='stocks-list row panel callout radius'>
          Current Balance: ${balance} <br/>
          Monthly Contribution: ${monthlyContribution} <br/>
        </div>
        <div className='stocks-list row panel callout radius'>
          List of Stock Investments</div>
        <div className='row'>{myStocks}</div>
        {errors}
      </div>
    )
  }
}

export default StocksIndexContainer
