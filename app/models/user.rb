class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         authentication_keys: [:login]

  validates :username, presence: :true, uniqueness: { case_sensitive: false }
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  has_many :stock_ownerships
  has_many :stocks, through: :stock_ownerships
  has_many :reviews

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

  def search_stock (stock)
    self.stock_ownerships.where(user: self, stock: stock).first
  end

  def has_stock? (stock)
    self.stock_ownerships.each do |record|
      if record.stock.symbol == stock.symbol
        return true
      end
    end
    return false
  end

  def sector_count (sector)
    count = 0
    self.stock_ownerships.each do |record|
      if record.stock.sector == sector
        count += 1
      end
    end
    return count
  end

  def check_balance
    puts "Checking user #{self.username} (id: #{self.id}) balance now"

    this_month = Time.now.month
    month_comparison =  this_month - self.modified_at.month
    if (month_comparison == 1 || month_comparison ==  -11)
      puts "User last modified at #{self.modified_at}"
      puts "Today's date is #{Time.now}, self's balance is #{self.balance}"
      self.update(
        balance: self.balance += self.monthly_contribution,
        modified_at: Time.now
      )
      puts "User received monthly contribution of #{self.monthly_contribution}"
      puts "User's total balance is now #{self.balance}"
      puts ""
    end
    puts "Finish checking user balance"
  end


  def range_check(batch)
    self.stock_ownerships.each do |record|
      if batch[record.stock.symbol]["quote"]["latestPrice"] < record.low_range && !record.notified
        InvestmentMailer.below_range(self, batch[record.stock.symbol]["quote"], record).deliver_now
        record.update(notified: true)
        puts "Send e-mail notification due to #{record.stock.symbol} falling below set range"
      elsif batch[record.stock.symbol]["quote"]["latestPrice"] > record.high_range && !record.notified
        InvestmentMailer.above_range(self, batch[record.stock.symbol]["quote"], record).deliver_now
        record.update(notified: true)
        puts "Send e-mail notification due to #{record.stock.symbol} risen above set range"
      end
    end
  end
end
