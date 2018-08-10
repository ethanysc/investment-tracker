import React from 'react'
import { browserHistory } from 'react-router'

import StocksIndexTile from '../../components/stocks/StocksIndexTile'

class AllStocksContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      newStock: null,
      errors: []
    }
    this.fetchSectorStocks = this.fetchSectorStocks.bind(this)
    this.postStock = this.postStock.bind(this)
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

  componentDidUpdate(){
    $(document).foundation('tab', 'reflow');
  }

  fetchSectorStocks(sectorName){
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

  postStock(payload){
    let jsonPayload = JSON.parse(payload)
    let formatPayload = {
      symbol: jsonPayload.symbol,
      company_name: jsonPayload.companyName,
      primary_exchange: jsonPayload.primaryExchange,
      sector: jsonPayload.sector,
      open: jsonPayload.open,
      close: jsonPayload.close,
      high: jsonPayload.high,
      low: jsonPayload.low,
      price: jsonPayload.latestPrice,
      volume: jsonPayload.latestVolume,
      change: jsonPayload.change,
      change_percent: jsonPayload.changePercent
    }
    fetch(`/api/v1/stocks.json`, {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(formatPayload)
    })
      .then(response => {
        if(response.ok){
          return response
        }
        else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
          if(response.status == 401){
            alert("You must be signed in to add to list of stocks!!!")
          }
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.newStock){
          browserHistory.push(`/stocks/${body.newStock.id}`)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let handleAdd = (event) => {
      this.postStock(event.target.name)
    }
    let stocksList = ''
    if (this.state.stocks.length > 0){
      this.state.stocks.sort(function(a, b){
        return b.latestVolume - a.latestVolume
      })
      stocksList = this.state.stocks.slice(0, 19).map((stock) => {
        return(
          <StocksIndexTile
            key={stock.symbol}
            stock={stock}
            handleClick={handleAdd}
          />
        )
      })
    }

    let handleCategories = (event) => {
      this.fetchSectorStocks(event.target.innerText)
    }

    return(
      <div className='stock-index wrapper'>
        <h1 className='stock-index header'>List of Stocks</h1>

          <ul className="tabs" data-tab>
            <li className="tab-title active" onClick={handleCategories} name='Financials'><a href="#panel1">Financials</a></li>
            <li className="tab-title" onClick={handleCategories} name='Technology'><a href="#panel1">Technology</a></li>
            <li className="tab-title" onClick={handleCategories} name='Health%20Care'><a href="#panel1">Healthcare</a></li>
            <li className="tab-title" onClick={handleCategories} name='Communication%20Services'><a href="#panel1">Communication Services</a></li>
            <li className="tab-title" onClick={handleCategories} name='Consumer%20Discretionary'><a href="#panel1">Consumer Discretionary</a></li>
            <li className="tab-title" onClick={handleCategories} name='Consumer%20Staples'><a href="#panel1">Consumer Staples</a></li>
            <li className="tab-title" onClick={handleCategories} name='Energy'><a href="#panel1">Energy</a></li>
          </ul>
          <div className="tabs-content">
            <div className="content active" id="panel1">
              <ul>{stocksList}</ul>
            </div>
          </div>
      </div>
    )
  }
}

export default AllStocksContainer
