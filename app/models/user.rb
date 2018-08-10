class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         authentication_keys: [:login]

  validates :username, presence: :true, uniqueness: { case_sensitive: false }
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  has_many :stock_ownerships
  has_many :stocks, through: :stock_ownerships

  attr_writer :login

  def login
    @login || self.username || self.email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions).first
    end
  end

  def stock_price (stock)
    self.stock_ownerships.where(user: self, stock: stock).first.price
  end

  def stock_share (stock)
    self.stock_ownerships.where(user: self, stock: stock).first.share
  end

  def stock_high_range (stock)
    self.stock_ownerships.where(user: self, stock: stock).first.high_range
  end

  def stock_low_range (stock)
    self.stock_ownerships.where(user: self, stock: stock).first.low_range
  end
end
