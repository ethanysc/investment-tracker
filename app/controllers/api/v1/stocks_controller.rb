class Api::V1::StocksController < ApiController
  def index
    if !current_user.nil?
      fetch_array = []
      stock_array = []
      current_user.stocks.each do |stock|
        parser = StockParser.new
        fetch_array << parser.get_stock(stock.symbol).first
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
      pie_chart = [['Sector', 'Count']]
      Sector.all.each do |sector|
        pie_chart << [sector.sector, current_user.sector_count(sector)]
      end
      render json: { stocks: fetch_array, userInfo: stock_array, pieChart: pie_chart}
    else
      render json: { errors: 'Please log in to view your investment portfolio'}
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

    render json: { stock: fetch_obj, userInfo: stock_obj, stats: stats_obj }
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
end
