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

  def get_batch(symbol_string, stocks)
    query_string = "https://api.iextrading.com/1.0/stock/market/batch?symbols=#{symbol_string}&types=quote"
    response = HTTParty.get(query_string)
    batch_array = []
    stocks.each do |stock|
      batch_array << response[stock.symbol]["quote"]
    end
    batch_array
  end

  def get_chart(symbol_string, stocks)
    query_string = "https://api.iextrading.com/1.0/stock/market/batch?symbols=#{symbol_string}&types=chart&range=1m"
    response = HTTParty.get(query_string)
    chart_array = [["Date"]]

    stocks.each do |stock|
      chart_array.first << stock.symbol
    end

    response[stocks.first.symbol]["chart"].each do |stock_data|
      chart_array << [stock_data["date"]]
    end

    stocks.each do |stock|
      response[stock.symbol]["chart"].each_with_index do |stock_data, index|
          chart_array[index + 1] << stock_data["close"]
      end
    end
    return chart_array
  end

  def get_news(symbol)
    response = HTTParty.get("https://api.iextrading.com/1.0/stock/#{symbol}/batch?types=news")
    stock_news = response["news"]
    @stock_news = stock_news
  end

  def range_get_batch
    query_array = []
    Stock.all.each do |stock|
      query_array << stock.symbol
    end
    query_string = query_array.join(',')
    query_string = "https://api.iextrading.com/1.0/stock/market/batch?symbols=#{query_string}&types=quote"
    response = HTTParty.get(query_string)
    response
  end
end
