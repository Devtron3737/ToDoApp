Rails.application.routes.draw do
  namespace :api do
    resources :to_dos
  end
  root 'api/static_pages#action'
end
