class AddBelongsToSectorToStocks < ActiveRecord::Migration[5.2]
  def change
    add_reference :stocks, :sector, index: true
  end
end
