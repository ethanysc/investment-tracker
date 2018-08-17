class InvestmentMailer < ApplicationMailer
  def below_range(user, stock, stock_ownership)
    @user = user
    @stock = stock
    @stock_ownership = stock_ownership

    mail(
      to: user.email,
      subject: "#{stock['symbol']} Investment at InvestmentTracker Requires Immediate Attention"
    )
  end

  def above_range(user, stock, stock_ownership)
    @user = user
    @stock = stock
    @stock_ownership = stock_ownership
    
    mail(
      to: user.email,
      subject: "#{stock['symbol']} Investment at InvestmentTracker Requires Immediate Attention"
    )
  end
end
