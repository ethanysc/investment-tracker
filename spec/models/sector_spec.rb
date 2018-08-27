require 'rails_helper'

RSpec.describe Sector, type: :model do
  describe "validations" do
    let!(:sector) {FactoryBot.build(:sector)}
    let!(:sector1) {FactoryBot.build(:sector, sector: '')}

    it "is valid with all required fields specified" do
      expect(sector).to be_valid
    end

    it "is invalid with body not specified" do
      expect(sector1).not_to be_valid
    end
  end

  describe "ActiveRecord associations" do
    let!(:sector) {FactoryBot.build(:sector)}

    it "belongs to an user" do
      expect(sector).to have_many(:stocks)
    end
  end

  describe "#identify_sector" do
    let!(:sector) {FactoryBot.build(:sector)}

    it "identifies and returns existing sector" do
      expect(sector.identify_sector('Banking').sector).to eq 'Banking'
    end

    it "creates and returns non-existig sector" do
      expect(sector.identify_sector('Energy').sector).to eq 'Energy'
    end
  end
end
