class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates_uniqueness_of :symbol, case_sensitive: true

  belongs_to :sector
  has_many :stock_ownerships
  has_many :users, through: :stock_ownerships
  has_many :reviews

  def exists_already?
    Stock.all.each do |stock|
      if stock.symbol == self.symbol
        return true
      end
    end
    return false
  end
end
