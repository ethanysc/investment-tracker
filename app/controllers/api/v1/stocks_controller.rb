class Api::V1::StocksController < ApiController
  def index
    if(current_user)
      current_user.stocks.each do |stock|
        fetchObj = FetchStock.new(stock.symbol)
        binding.pry
        stock = fetchObj.get_stock
      end
      render json: current_user.stocks
    else
      render json: current_user
    end
  end

  def show
    stock = Stock.find(params[:id])
    parser = StockParser.new
    fetchObj = parser.get_stock(stock.symbol).first
    stockObj = {
      price: current_user.stock_price(stock),
      share: current_user.stock_share(stock),
      highRange: current_user.stock_high_range(stock),
      lowRange: current_user.stock_low_range(stock)
    }
    compareObj = {

    }
    binding.pry
    render json: { stock: fetchObj, userInfo: stockObj }
  end

  def create
    sector = Sector.identify_sector(params[:sector])
    new_stock = Stock.new(symbol: params[:symbol], sector: sector)
    if new_stock.save
      # StockOwnership.create(
      #   user: current_user,
      #   stock: new_stock,
      #   price: params[:price],
      #   share: params[:volume]
      # )
      # StockOwnership class method to create StockOwnership, decrease current_user by price * shares
      render json: { newStock: new_stock }
    else
      render json: { errors: "Selected stock is already in your portfolio" }, status: 422
    end
  end

  def stock_params
    params
      .require(:stock)
      .permit(
        :symbol,
        :company_name,
        :primary_exchange,
        :sector,
        :open,
        :close,
        :high,
        :low,
        :price,
        :change,
        :change_percent
      )
  end
end
