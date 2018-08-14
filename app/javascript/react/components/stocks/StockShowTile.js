import React from 'react'

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
  return(
    <div>
      <div className='panel callout radius'>
        Graph
      </div>
      <div className='panel callout radius'>
        <h1>Stock Info</h1>
        <div>Symbol: {stock.symbol}</div>
        <div>Company Name: {stock.companyName}</div>
        <div>Primary Exchange: {stock.primaryExchange}</div>
        <div>Sector: {stock.sector}</div>
        <div>Open: ${stock.open}</div>
        <div>Close: ${stock.close}</div>
        <div>High: ${stock.high}</div>
        <div>Low: ${stock.low}</div>
        <div>Latest Price: ${stock.price}</div>
        <div>Latest Volume: {stock.volume}</div>
        <div>Change: {stock.change}</div>
        <div>Change %: {Math.round(stock.changePercent * 100) / 100}%</div>
      </div>
      <div className='panel callout radius'>
        <h1>Investment Info</h1>
        <div>Bought Price: ${userInfo.price}</div>
        <div>Share: {userInfo.share}</div>
        <div>Set High Range: ${userInfo.highRange}</div>
        <div>Set Low Range: ${userInfo.lowRange}</div>
        <div>Return: ${props.stats.profit}</div>
        <div>Return %: {props.stats.profitPercent}%</div>
      </div>
      <div className='panel callout radius'>
        <h1>Most Recent Stock News</h1>
        {news}
      </div>

    </div>
  )
}

export default StockShowTile
