class AddBalanceAndMonthlyContributionToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :balance, :decimal, precision: 7, scale: 2
    add_column :users, :monthly_contribution, :decimal, precision: 7, scale: 2
  end
  def down
    remove_column :users, :balance
    remove_column :users, :monthly_contribution
  end
end
