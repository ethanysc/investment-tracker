require 'httparty'

class StockParser
  attr_accessor :stock

  def initialize
    @stock = []
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
      price: response["quote"]["price"],
      change: response["quote"]["change"],
      changePercent: response["quote"]["changePercent"]
    }
    @stock << stock_data
  end
end
