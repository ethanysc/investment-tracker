require 'rails_helper'

RSpec.describe Stock, type: :model do
  describe "validations" do
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock)}
    let!(:stock1) {FactoryBot.build(:stock, symbol: '')}

    it "is valid with all required fields specified" do
      expect(stock).to be_valid
    end

    it "is invalid with symbol not specified" do
      expect(stock1).not_to be_valid
    end

    it "is invalid with non-unique symbol" do
      should validate_uniqueness_of(:symbol)
    end
  end

  describe "ActiveRecord associations" do
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.build(:stock)}

    it "belongs to a sector" do
      expect(stock).to belong_to(:sector)
    end

    it "has many users" do
      expect(stock).to have_many(:users).through(:stock_ownerships)
    end

    it "has many stock_ownerships" do
      expect(stock).to have_many(:stock_ownerships)
    end

    it "has many reviews" do
      expect(stock).to have_many(:reviews)
    end
  end

  describe "#exists_already?" do
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock)}
    let!(:stock1) {FactoryBot.build(:stock, symbol: 'APPL')}

    it "returns true for existing stock symbol" do
      expect(stock.exists_already?).to eq true
    end

    it "returns false for nonexisting stock symbol" do
      expect(stock1.exists_already?).to eq false
    end
  end
end
