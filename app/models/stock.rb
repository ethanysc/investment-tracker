class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates_uniqueness_of :symbol, case_sensitive: true

  belongs_to :sector

  private
end
