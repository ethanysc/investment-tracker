Rails.application.routes.draw do
  devise_for :users

  root 'portfolios#index'
  resources :portfolios, only: [:index]
  resources :stocks, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index, :show]
    end
  end
end
