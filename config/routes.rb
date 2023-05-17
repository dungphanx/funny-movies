# frozen_string_literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'

      resources :movies, only: %i[index create]
    end
  end
end
