import React from 'react'
import { browserHistory } from 'react-router'
import LineChart from '../charts/LineChart'

import EditStockFormContainer from '../../containers/stocks/EditStockFormContainer'
import ReviewTileContainer from '../../containers/reviews/ReviewTileContainer'
import ReviewFormContainer from '../../containers/reviews/ReviewFormContainer'

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

  let reviews = props.reviews.map((review) => {
    let handleReviewDelete = () => {
      props.deleteReview(review.id)
    }
    return(
      <ReviewTileContainer
        key={review.id}
        id={review.id}
        stockId={props.id}
        review={review}
        handleDelete={handleReviewDelete}
      />
    )
  })

  let statsColor = (stats) => {
      if (stats > 0){
        return 'green'
      }
      else if (stats < 0){
        return 'red'
      }
    }

  return(
    <div>
      <div className='stock-title panel callout radius row colums small-12'>
        <h1>{stock.symbol}</h1>
      </div>
      <div className='row'>
        <div className='show-chart panel callout radius columns small-12'>
          <LineChart data={props.data}/>
        </div>
      </div>
      <div className='row'>
        <div className='stock-show-panel panel callout radius columns small-6'>
          <h1>Stock Info</h1>
          <div>{stock.companyName}</div>
          <div>{stock.primaryExchange}</div>
          <div>{stock.sector}</div>
          <div>Open: ${parseFloat(stock.open).toFixed(2)}</div>
          <div>Close: ${parseFloat(stock.close).toFixed(2)}</div>
          <div>High: ${parseFloat(stock.high).toFixed(2)}</div>
          <div>Low: ${parseFloat(stock.low).toFixed(2)}</div>
          <div>Latest Price: ${parseFloat(stock.price).toFixed(2)}</div>
          <div>Latest Volume: {stock.volume}</div>
          <div>Change: <span className={statsColor(stock.change)}>${parseFloat(stock.change).toFixed(2)}</span></div>
          <div>Change%: <span className={statsColor(stock.changePercent)}>{Math.round(stock.changePercent * 100) / 100}%</span></div>
        </div>
        <div className='investment-show-panel panel callout radius columns small-6'>
          <h1>Investment Info</h1>
          <div>Bought Price: ${parseFloat(userInfo.price).toFixed(2)}</div>
          <div>Shares: {userInfo.share}</div>
          <div>Set High Range: <span className='green'>${parseFloat(userInfo.highRange).toFixed(2)}</span></div>
          <div>Set Low Range: <span className='red'>${parseFloat(userInfo.lowRange).toFixed(2)}</span></div>
          <div>Return: <span className={statsColor(props.stats.profit)}>${Math.round(props.stats.profit * 100) / 100}</span></div>
          <div>Return %: <span className={statsColor(props.stats.profitPercent)}>{Math.round(props.stats.profitPercent * 100) / 100}%</span></div>
          <EditStockFormContainer
            stock={stock}
            userInfo={userInfo}
            handleEdit={props.handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <div className='row' data-equalizer>
        <div className='news-panel panel callout radius columns small-6' data-equalizer-watch>
          <h1>Most Recent Stock News</h1>
          {news}
        </div>
        <div className='review-panel panel callout radius columns small-6' data-equalizer-watch>
          <h1>Reviews & Comments</h1>
          {reviews}
          <ReviewFormContainer
            stockId={props.id}
            handleAdd={props.addReview}
          />
        </div>
      </div>
    </div>
  )
}

export default StockShowTile
