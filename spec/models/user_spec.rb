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

  describe "ActiveRecord associations" do
    let!(:user) {FactoryBot.build(:user)}

    it "has many stock_ownerships" do
      expect(user).to have_many(:stock_ownerships)
    end

    it "has many stocks" do
      expect(user).to have_many(:stocks).through(:stock_ownerships)
    end

    it "has many stock_ownerships" do
      expect(user).to have_many(:reviews)
    end
  end

  describe "#search_stock" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.create(:stock_ownership)}

    it "returns correct stock_ownership record" do
      expect(user.search_stock(stock)).to eq stock_ownership
    end
  end

  describe "#has_stock?" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.create(:stock_ownership)}

    it "checks if user owns certain stock" do
      expect(user.has_stock?(stock)).to eq true
    end
  end
end
