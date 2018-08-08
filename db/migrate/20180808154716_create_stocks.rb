class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.string :company_name, null: false
      t.string :primary_exchange, null: false
      t.string :sector, null: false
      t.float :open, null: false, scale: 2
      t.float :close, null: false, scale: 2
      t.float :high, null: false, scale: 2
      t.float :low, null: false, scale: 2
      t.float :price, null: false, scale: 2
      t.float :change, null: false, scale: 2
      t.float :change_percent, null: false, scale: 2

      t.timestamps null: false
    end
  end
end
