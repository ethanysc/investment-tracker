class StockOwnership < ApplicationRecord
  validates :price_bought, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :amount, presence: true
  validates :high_range, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :low_range, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }

  belongs_to :user
  belongs_to :stock

  private

end
