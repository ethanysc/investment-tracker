class Sector < ApplicationRecord
  validates :sector, presence: true

  has_many :stocks

  private
end
