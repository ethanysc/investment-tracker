FactoryBot.define do
  factory :stock_ownership do
    price '50'
    share '2'
    high_range '55'
    low_range '45'
    user_id '1'
    stock_id '1'
    notified 'false'
  end
end
