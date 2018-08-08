class Api::V1::StocksController < ApiController
  def index
    render json: Stock.all
  end
end
