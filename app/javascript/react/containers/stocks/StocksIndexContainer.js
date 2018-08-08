import React from 'react'

import StocksIndexTile from '../../components/stocks/StocksIndexTile'

class StocksIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: []
    }
    this.fetchStocks = this.fetchStocks.bind(this)
  }

  componentDidMount(){
    fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Financials`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        stocks: this.state.stocks.concat(body)
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  fetchStocks(sectorName){
    fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${sectorName}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        stocks: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let stocksList = ''
    if (this.state.stocks.length > 0){
      stocksList = this.state.stocks.map((stock) => {
        return(
          <StocksIndexTile
            key={stock.id}
            id={stock.id}
            stock={stock}
          />
        )
      })
    }
    return(
      <div className='stock-index wrapper'>This is the Stock Index Page
        <h1 className='stock-index header'>List of Stocks</h1>
        <button onClick={this.fetchStocks('Technology')}>Technology</button>
        <div className='stock-list-wrapper'>
          <ul className='stock-list'>
            {stocksList}
          </ul>
        </div>
      </div>
    )
  }
}

export default StocksIndexContainer
