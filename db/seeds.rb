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
  sector: 'Technology'
)

StockOwnership.create!(
  user: user,
  stock: stock,
  price: 180,
  share: 500,
  high_range: 250,
  low_range: 180
)
