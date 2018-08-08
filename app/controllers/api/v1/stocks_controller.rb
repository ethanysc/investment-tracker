class StocksController < ApiController
  def index
    render json: Stock.all
  end
end
