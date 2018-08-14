class Sector < ApplicationRecord
  validates :sector, presence: true

  has_many :stocks

  def identify_sector(name)
    if Sector.where(sector: name).empty?
      new_sector = Sector.create(sector: name)
      return new_sector
    else
      return Sector.where(sector: name).first
    end
  end
end
