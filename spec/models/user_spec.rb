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
end
