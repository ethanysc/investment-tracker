namespace :contribution do
  desc "Update balance by monthly contribution every month"
  task update_balance: :environment do
    puts "Checking user balances now"
    this_month = Time.now.month
    User.all.each do |user|
      month_comparison =  this_month - user.modified_at.month
      if (month_comparison == 1 || month_comparison ==  -11)
        puts "User #{user.username} (id: #{user.id}) last modified at #{user.modified_at}"
        puts "Today's date is #{Time.now}, user's balance is #{user.balance}"
        user.update(
          balance: user.balance += user.monthly_contribution,
          modified_at: Time.now
        )
        puts "User received monthly contribution of #{user.monthly_contribution}"
        puts "User's total balance is now #{user.balance}"
        puts ""
      end
    end
    puts "Finish updating user balances"
  end
end
#
# namespace :notification do
#   desc "Send notification if current investment price falls below or above set range of expectation"
#   task :check_risk :environment do
#
#   end
# end
