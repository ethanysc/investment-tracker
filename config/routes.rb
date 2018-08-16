Rails.application.routes.draw do
  devise_for :users

  root 'stocks#index'
  resources :all_stocks, only: [:index]
  resources :stocks, only: [:index, :show, :create]


  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index, :show, :create, :update, :destroy] do
        resources :reviews, only: [:show, :create, :update, :destroy]
      end
      resources :reviews, only: [:show, :create, :update, :destroy]
    end
  end
end
