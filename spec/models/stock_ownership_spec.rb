require 'rails_helper'

RSpec.describe StockOwnership, type: :model do
  describe "validation" do
    let!(:user) {FactoryBot.create(:user)}
    let!(:sector) {FactoryBot.create(:sector)}
    let!(:stock) {FactoryBot.create(:stock)}
    let!(:stock_ownership) {FactoryBot.build(:stock_ownership)}

    it "is valid with all required fields specified" do
      expect(stock_ownership).to be_valid
    end
  end

  describe "price validation" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.build(:stock_ownership, price: '')}

    it "is invalid with price not specified" do
      expect(stock_ownership).not_to be_valid
    end
  end

  describe "share validation" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.build(:stock_ownership, share: '')}

    it "is invalid with share not specified" do
      expect(stock_ownership).not_to be_valid
    end
  end

  describe "high_range validation" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.build(:stock_ownership, high_range: '')}

    it "is invalid with high_range not specified" do
      expect(stock_ownership).not_to be_valid
    end
  end

  describe "low_range validation" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.build(:stock_ownership, low_range: '')}

    it "is invalid with low_range not specified" do
      expect(stock_ownership).not_to be_valid
    end
  end

  describe "ActiveRecord associations" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:stock_ownership) {FactoryBot.create(:stock_ownership)}

    it "has many stock_ownerships" do
      expect(stock_ownership).to belong_to(:user)
    end

    it "has many stocks" do
      expect(stock_ownership).to belong_to(:stock)
    end
  end
end
