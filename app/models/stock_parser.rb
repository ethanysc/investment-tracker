require 'httparty'

class StockParser
  attr_accessor :stock

  def initialize
    @stock = []
    @stock_news = []
  end

  def get_stock(symbol)
    response = HTTParty.get("https://api.iextrading.com/1.0/stock/#{symbol}/batch?types=quote")
    stock_data = {
      symbol: response["quote"]["symbol"],
      companyName: response["quote"]["companyName"],
      primaryExchange: response["quote"]["primaryExchange"],
      sector: response["quote"]["sector"],
      open: response["quote"]["open"],
      close: response["quote"]["close"],
      high: response["quote"]["high"],
      low: response["quote"]["low"],
      price: response["quote"]["latestPrice"],
      volume: response["quote"]["latestVolume"],
      change: response["quote"]["change"],
      changePercent: response["quote"]["changePercent"]
    }
    @stock << stock_data
  end

  def get_batch(query, stocks)
    response = HTTParty.get(query)
    batch_array = []
    stocks.each do |stock|
      batch_array << response[stock.symbol]["quote"]
    end
    batch_array
  end

  def get_news(symbol)
    response = HTTParty.get("https://api.iextrading.com/1.0/stock/#{symbol}/batch?types=news")
    stock_news = response["news"]
    @stock_news = stock_news
  end
end
