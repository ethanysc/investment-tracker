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
    fetch(`/api/v1/stocks.json`, {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload)
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
        else {
          this.setState({ errors: this.state.errors.concat(body.errors) })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let handleAdd = (payload) => {
      this.postStock(payload)
    }
    let stocksList = ''
    if (this.state.stocks.length > 0){
      this.state.stocks.sort(function(a, b){
        return b.latestVolume - a.latestVolume
      })
      stocksList = this.state.stocks.slice(0, 20).map((stock) => {
        return(
          <StocksIndexTile
            key={stock.symbol}
            stock={stock}
            handleClick={handleAdd}
            errors={this.state.errors}
          />
        )
      })
    }

    let handleCategories = (event) => {
      this.fetchSectorStocks(event.target.innerText)
    }

    return(
      <div className="stock-index wrapper">
        <div className='stock-index-header'>
          <h1 className='stock-index header'>Stock Investments</h1>
        </div>
        <div className="row">
          <div className='columns small-10 small-centered' >
            <div className='sector-tabs'>
              <ul className="tabs small-centered" data-equalizer data-tab>
                <li className="tab-title active one-line-tab" onClick={handleCategories} name='Financials' data-equalizer-watch><a href="#panel1">Financials</a></li>
                <li className="tab-title one-line-tab" onClick={handleCategories} name='Technology' data-equalizer-watch><a href="#panel1">Technology</a></li>
                <li className="tab-title one-line-tab" onClick={handleCategories} name='Health%20Care' data-equalizer-watch><a href="#panel1">Healthcare</a></li>
                <li className="tab-title" onClick={handleCategories} name='Communication%20Services' data-equalizer-watch><a href="#panel1">Communication Services</a></li>
                <li className="tab-title" onClick={handleCategories} name='Consumer%20Discretionary' data-equalizer-watch><a href="#panel1">Consumer Discretionary</a></li>
                <li className="tab-title" onClick={handleCategories} name='Consumer%20Staples' data-equalizer-watch><a href="#panel1">Consumer Staples</a></li>
                <li className="tab-title one-line-tab" onClick={handleCategories} name='Energy' data-equalizer-watch><a href="#panel1">Energy</a></li>
              </ul>
            </div>
            <div className="tabs-content small-centered">
              <div className="content active" id="panel1">
                <div className='row' data-equalizer>
                  <div>{stocksList}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllStocksContainer
