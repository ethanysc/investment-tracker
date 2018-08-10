class AddBalanceAndMonthlyContributionToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :balance, :decimal, null: false
    add_column :users, :monthly_contribution, :decimal, null: false
  end
  def down
    remove_column :users, :balance
    remove_column :users, :monthly_contribution
  end
end
