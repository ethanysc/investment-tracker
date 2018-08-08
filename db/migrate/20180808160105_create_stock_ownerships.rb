class CreateStockOwnerships < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_ownerships do |t|
      t.float :price_bought, null: false, scale: 2
      t.integer :amount, null: false
      t.float :high_range, scale: 2
      t.float :low_range, scale: 2

      t.belongs_to :user, null: false
      t.belongs_to :stock, null: false

      t.timestamps null: false
    end
  end
end
