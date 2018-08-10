Rails.application.routes.draw do
  devise_for :users

  root 'stocks#index'
  resources :all_stocks, only: [:index]
  resources :stocks, only: [:index, :show, :create]

  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index, :show, :create]
    end
  end
end
