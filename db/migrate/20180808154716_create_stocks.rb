class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.string :company_name, null: false
      t.string :primary_exchange, null: false
      t.string :sector, null: false
      t.decimal :open, null: false, precision: 7, scale: 2
      t.decimal :close, null: false, precision: 7, scale: 2
      t.decimal :high, null: false, precision: 7, scale: 2
      t.decimal :low, null: false, precision: 7, scale: 2
      t.decimal :price, null: false, precision: 7, scale: 2
      t.decimal :change, null: false, precision: 4, scale: 2
      t.decimal :change_percent, null: false, precision: 4, scale: 4

      t.timestamps null: false
    end
  end
end
