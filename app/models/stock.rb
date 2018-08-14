class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates_uniqueness_of :symbol, case_sensitive: true

  belongs_to :sector

  def exists_already? (stock_check)
    Stock.all.each do |stock|
      if stock.symbol == stock_check.symbol
        return true
      end
    end
    return false
  end
end
