Rails.application.routes.draw do
  root 'portfolios#index'
  devise_for :users

  resources :portfolios, only: [:index]
end
