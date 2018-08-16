namespace :contribution do
  desc "Update balance by monthly contribution every month"
  task update_balance: :environment do
    User.all.each do |user|
      user.check_balance
    end
  end
end

namespace :notification do
  desc "Send notification if current investment price falls below or above set range of expectation"
  task check_risk: :environment do

  end
end
