require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    let!(:user) {FactoryBot.build(:user)}
    let!(:user1) {FactoryBot.build(:user, username: '')}
    let!(:user2) {FactoryBot.build(:user, email: '')}
    let!(:user3) {FactoryBot.build(:user, password: '')}

    it "is valid with all required fields specified" do
      expect(user).to be_valid
    end
    it "is invalid with username not specified" do
      expect(user1).not_to be_valid
    end
    it "is invalid with e-mail not specified" do
      expect(user2).not_to be_valid
    end
    it "is invalid with password not specified" do
      expect(user3).not_to be_valid
    end
  end

  # describe "#search_stock" do
  #   let!(:user) {FactoryBot.build(:user)}
  #   let!(:sector) {FactoryBot.build(:sector)}
  #   let!(:stock) {FactoryBot.build(:stock)}
  #   let!(:stock_ownership) {FactoryBot.build(:stock_ownership)}
  #
  #   it "returns correct stock_ownership record" do
  #     stock.sector = sector
  #     stock_ownership.user = user
  #     stock_ownership.stock = stock
  #
  #     expect(user.search_stock(stock)).to equal stock_ownership
  #   end
  # end
end
