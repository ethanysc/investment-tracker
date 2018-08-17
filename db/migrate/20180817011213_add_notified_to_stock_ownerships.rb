class AddNotifiedToStockOwnerships < ActiveRecord::Migration[5.2]
  def change
    add_column :stock_ownerships, :notified, :boolean, default: false
  end
end
