require 'net/http'
require 'json'

class FetchStock < ApplicationRecord
  attr_reader :stock

  def initialize(params)
    @symbol = params[:symbol]
    @stock = null
  end

  def self.get_stock
    uri = URI(`https://api.iextrading.com/1.0/stock/${@symbol}/batch?types=quote`)
    response = NET::HTTP.get(uri)
    @stock = JSON.parse(response)
    binding.pry
    @stock
  end
end
