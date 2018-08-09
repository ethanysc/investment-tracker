# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
user = User.create!(
  email: 'ethanysc@gmail',
  password: 'apple1234',
  username: 'ethanysc',
  balance: '$1000',
  monthly_contribution: '$50'
)

stock = Stock.create!(
  symbol: 'APPL',
  company_name: 'Apple Inc.',
  primary_exchange: 'Nasdaq Global Select',
  sector: 'Technology',
  open: 206.05,
  close: 207.11,
  high: 207.81,
  low: 204.52,
  price: 207.03,
  change: 0.08,
  change_percent: 0.00039
)

StockOwnership.create!(
  user: user,
  stock: stock,
  price_bought: 180,
  amount: 500,
  high_range: 250,
  low_range: 180
)
