class Api::V1::StocksController < ApiController
  def index
    if !current_user.nil?
      fetch_arry = []
      stock_array = []
      chart_array = []
      query_symbols = []

      current_user.stocks.each do |stock|
        query_symbols << stock.symbol
      end
      query_string = query_symbols.join(',')

      stock_parser = StockParser.new
      fetch_array = stock_parser.get_batch(query_string, current_user.stocks)
      line_chart_array = stock_parser.get_chart(query_string, current_user.stocks)

      current_user.stocks.each do |stock|
        current_stock = current_user.search_stock(stock)
        stock_array << {
          id: stock.id,
          balance: current_user.balance,
          monthlyContribution: current_user.monthly_contribution,
          price: current_stock.price,
          share: current_stock.share,
          highRange: current_stock.high_range,
          lowRange: current_stock.low_range
        }
      end
      pie_chart_array = [['Sector', 'Count']]
      Sector.all.each do |sector|
        pie_chart_array << [sector.sector, current_user.sector_count(sector)]
      end

      render json: { stocks: fetch_array, userInfo: stock_array, pieChart: pie_chart_array, lineChart: line_chart_array}
    else
      render json: { errors: 'Please select an option below'}
    end
  end

  def show
    stock = Stock.find(params[:id])
    parser = StockParser.new
    fetch_obj = parser.get_stock(stock.symbol).first

    user_stock = current_user.search_stock(stock)
    stock_obj = {
      price: user_stock.price,
      share: user_stock.share,
      highRange: user_stock.high_range,
      lowRange: user_stock.low_range
    }

    stock_news = parser.get_news(stock.symbol)
    stats_obj = {
      profit: (fetch_obj[:price] - stock_obj[:price]) * stock_obj[:share],
      profitPercent: "%.2f" % ((fetch_obj[:price] - stock_obj[:price]) / stock_obj[:price] * 100),
      news: stock_news
    }

    array_stock = []
    array_stock << stock
    line_chart_array = parser.get_chart(stock.symbol, array_stock)

    render json: { stock: fetch_obj, userInfo: stock_obj, stats: stats_obj, lineChart: line_chart_array }
  end

  def create
    find_sector = Sector.new
    sector = find_sector.identify_sector(params[:sector])
    new_stock = Stock.new(symbol: params[:symbol], sector: sector)

    if current_user.nil?
      render json: { errors: "Please log in first" }
    elsif current_user.has_stock?(new_stock)
      render json: { errors: "Selected stock is already in your portfolio" }
    else
      if !new_stock.exists_already?(new_stock)
        new_stock.save
      else
        new_stock = Stock.where(symbol: params[:symbol]).first
      end

      new_balance = current_user.balance - params[:price] * params[:share].to_i
      if new_balance > 0
        new_stock_record = StockOwnership.create(
          user: current_user,
          stock: new_stock,
          price: params[:price],
          share: params[:share],
          high_range: params[:high_range],
          low_range: params[:low_range]
        )
        current_user.update(balance: new_balance)
          render json: { newStock: new_stock }
      else
          render json: { errors: "You don't have enough balance for this purchase" }
      end
    end
  end

  def update
    stock_record = StockOwnership.where(user: current_user, stock: Stock.where(symbol: params["stock"]["symbol"]))
    stock_record.update(high_range: params[:range].last, low_range: params[:range].first)
    render json: { id: stock_record.stock_id }
  end

  def destroy
    stock = Stock.find(params[:id])
    stock_record = StockOwnership.where(user: current_user, stock: stock).first
    current_stock = StockParser.new
    api_stock = current_stock.get_stock(stock.symbol).first
    current_user.update(balance: "%.2f" % (current_user.balance + api_stock[:price] * stock_record.share))

    stock_record.destroy
    render json: { errors: 'Stock sold' }
  end
end
