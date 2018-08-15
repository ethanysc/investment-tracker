import React from 'react'
import { browserHistory } from 'react-router'
import LineChart from '../charts/LineChart'

import EditStockFormContainer from '../../containers/stocks/EditStockFormContainer'

const StockShowTile = (props) => {
  let stock = props.stock
  let userInfo = props.userInfo

  let news = ''
  if (props.stats){
    news = props.stats.news.map((stock) => {
      return(
        <div key={stock.datetime}>
          <div><a href={stock.url} target="_blank">{stock.headline}</a></div>
          <div>Date: {stock.datetime.slice(0, 10)}</div>
          <div>From: {stock.source}</div>
          <div>{stock.summary.trim()}</div><br />
        </div>
      )
    })
  }

  let handleEdit = (payload) => {
    fetch(`/api/v1/stocks/${props.id}.json`, {
     credentials: 'same-origin',
     headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
     method: 'PATCH',
     body: JSON.stringify(payload)
   })
     .then(response => {
       if(response.ok){
         return response
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
         throw(error)
       }
     })
     .then(response => response.json())
     .then(body => browserHistory.push(`/stocks/${body.id}`))
     .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let handleDelete = (payload) => {
    fetch(`/api/v1/stocks/${props.id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'DELETE',
    })
      .then(response => {
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => browserHistory.push('/'))
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
      <h1 className='stock-title panel callout radius row colums small-12'>
        {stock.symbol}
      </h1>
      <div className='row'>
        <div className='panel callout radius columns small-12'>
          <LineChart data={props.data}/>
        </div>
      </div>
      <div className='row'>
        <div className='stock-show-panel panel callout radius columns small-6'>
          <h1>Stock Info</h1>
          <div>{stock.companyName}</div>
          <div>{stock.primaryExchange}</div>
          <div>{stock.sector}</div>
          <div>Open: ${stock.open}</div>
          <div>Close: ${stock.close}</div>
          <div>High: ${stock.high}</div>
          <div>Low: ${stock.low}</div>
          <div>Latest Price: ${stock.price}</div>
          <div>Latest Volume: {stock.volume}</div>
          <div>Change: ${stock.change}</div>
          <div>Change %: {Math.round(stock.changePercent * 100) / 100}%</div>
        </div>
        <div className='investment-show-panel panel callout radius columns small-6'>
          <h1>Investment Info</h1>
          <div>Bought Price: ${userInfo.price}</div>
          <div>Shares: {userInfo.share}</div>
          <div>Set High Range: ${userInfo.highRange}</div>
          <div>Set Low Range: ${userInfo.lowRange}</div>
          <div>Return: ${Math.round(props.stats.profit * 100) / 100}</div>
          <div>Return %: {Math.round(props.stats.profitPercent * 100) / 100}%</div>
          <EditStockFormContainer
            stock={stock}
            userInfo={userInfo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <div className='row'>
        <div className='news-panel panel callout radius columns small-6'>
          <h1>Most Recent Stock News</h1>
          {news}
        </div>
        <div className='review-panel panel callout radius columns small-6'>
          Reviews and Review Form Here
        </div>
      </div>

    </div>
  )
}

export default StockShowTile
