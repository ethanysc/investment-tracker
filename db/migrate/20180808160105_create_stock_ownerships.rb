class CreateStockOwnerships < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_ownerships do |t|
      t.decimal :price, null: false, precision: 7, scale: 2
      t.integer :share, null: false
      t.decimal :high_range, precision: 7, scale: 2
      t.decimal :low_range, precision: 7, scale: 2

      t.belongs_to :user, null: false
      t.belongs_to :stock, null: false

      t.timestamps null: false
    end
  end
end
