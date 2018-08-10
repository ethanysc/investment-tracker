class StockOwnership < ApplicationRecord
  validates :price, presence: true
  validates :share, presence: true
  validates :high_range, presence: true
  validates :low_range, presence: true

  belongs_to :user
  belongs_to :stock

  private

end
