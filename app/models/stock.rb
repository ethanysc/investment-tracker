class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates :company_name, presence: true
  validates :primary_exchange, presence: true
  validates :sector, presence: true
  validates :open, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :close, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :high, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :low, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :price, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :change, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }
  validates :change_percent, presence: true, format: { with: /\A\d+(?:\.\d{2})?\z/ }

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
