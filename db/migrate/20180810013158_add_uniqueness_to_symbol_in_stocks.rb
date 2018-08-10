class AddUniquenessToSymbolInStocks < ActiveRecord::Migration[5.2]
  def change
    add_index :stocks, :symbol, unique: true
  end
end
