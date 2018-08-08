Rails.application.routes.draw do
  devise_for :users

  root 'portfolios#index'
  resources :portfolios, only: [:index]
  resources :stocks, only: [:index, :show]

  resources :api do
    resources :v1 do
      resources :stocks, only: [:index, :show]
    end
  end
end
