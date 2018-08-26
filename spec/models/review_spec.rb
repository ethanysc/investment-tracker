require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "validations" do
    let!(:user) {FactoryBot.create(:user, id: 1)}
    let!(:sector) {FactoryBot.create(:sector, id: 1)}
    let!(:stock) {FactoryBot.create(:stock, id: 1)}
    let!(:review) {FactoryBot.build(:review)}
    let!(:review1) {FactoryBot.build(:review, body: '')}

    it "is valid with all required fields specified" do
      expect(review).to be_valid
    end

    it "is invalid with body not specified" do
      expect(review1).not_to be_valid
    end
  end

  describe "ActiveRecord associations" do
    let!(:review) {FactoryBot.build(:review)}

    it "belongs to an user" do
      expect(review).to belong_to(:user)
    end

    it "belongs to a stock" do
      expect(review).to belong_to(:stock)
    end
  end
end
