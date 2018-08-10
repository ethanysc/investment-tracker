class Api::V1::StocksController < ApiController
  def index
    binding.pry
    if(current_user)
      render json: current_user.stocks
    else
      render json: current_user
    end
  end

  def show
    render json: Stock.find(params[:id])
  end

  def create
    new_stock = Stock.new(stock_params)
    if new_stock.save
      StockOwnership.create(user: current_user, stock: new_stock)
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
