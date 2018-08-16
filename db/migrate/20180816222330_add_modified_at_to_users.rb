class AddModifiedAtToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :modified_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
