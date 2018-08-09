class StockOwnership < ApplicationRecord
  validates :price_bought, presence: true
  validates :amount, presence: true
  validates :high_range, presence: true
  validates :low_range, presence: true

  belongs_to :user
  belongs_to :stock

  private

end
