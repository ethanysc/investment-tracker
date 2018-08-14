import React from 'react'

import PortfolioIndexTile from '../../components/stocks/PortfolioIndexTile'
import PieChart from '../../components/charts/PieChart'

class StocksIndexContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      userInfo: [],
      pieData: [],
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
          userInfo: this.state.userInfo.concat(body.userInfo),
          pieData: this.state.pieData.concat(body.pieChart)
        })
      }
      else {
        this.setState({ errors: this.state.errors.concat(body.errors) })
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
    let myStocks, userInfo = ''
    if (this.state.stocks.length > 0) {
      userInfo = <div className='stocks-list row panel callout radius'>
        <div className='columns small-10 small-centered'>
          Current Balance: ${this.state.userInfo[0].balance} <br/>
          Monthly Contribution: ${this.state.userInfo[0].monthlyContribution} <br/>
        </div>
      </div>
      let stocks = this.state.stocks.map((stock, index) => {
          return(
            <PortfolioIndexTile
              key={stock.id}
              stock={stock}
              userInfo={this.state.userInfo[index]}
            />
          )
        })
      myStocks = <div>
        <div className='stocks-list row panel callout radius'>
          <div className='columns small-10 small-centered'>
            List of Stock Investments
          </div>
        </div><div className='row'>{stocks}</div>
      </div>
    }

    let errors = ''
    if (this.state.errors.length > 0){
      errors = <div className='row'>
        <div className='log-in columns small-12 small-centered'>
          {this.state.errors[0]}<br />
        <button className='log-in-btn radius'><a href='/users/sign_in'>Log In</a></button>
        <button className='sign-up-btn radius'><a href='/users/sign_up'>Sign Up</a></button>
        </div>
      </div>
    }

    let pieChart = ''
    if (this.state.pieData.length > 0){
      pieChart = <div className='distribution-chart large-4 columns panel callout radius'>
        My Investment Diversification<br />
        <PieChart
           data={this.state.pieData}
         />
      </div>
    }

    let trendingChart = ''

    return(
      <div className='portfolio-index-wrapper'>
        <div className='row'>
          <div className='columns small-10 small-centered'>
          <div className='row'>
            <div className='greetings columns small-12 small-centered'>
              <h1>{this.timeOfDay()}Welcome to InvestmentTracker</h1>
            </div>
          </div>
          <div className='row'>
            {pieChart}
              <div className='investment-line-graph large-8 columns panel callout radius'>
                Investment Line Graph
              </div>
          </div>
          {userInfo}
          {myStocks}
          {errors}
      </div>
    </div>
  </div>
    )
  }
}

export default StocksIndexContainer
