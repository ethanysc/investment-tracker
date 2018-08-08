class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates :company_name, presence: true
  validates :primary_exchange, presence: true
  validates :sector, presence: true
  validates :open, presence: true
  validates :close, presence: true
  validates :high, presence: true
  validates :low, presence: true
  validates :price, presence: true
  validates :change, presence: true
  validates :change_percent, presence: true
  
  has_many :stock_ownerships
  has_many :users, through: :stock_ownerships

  private

  def change?
    if this.change > 0
      true
    else
      false
    end
  end
end
