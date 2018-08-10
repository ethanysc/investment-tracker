class ApplicationController < ActionController::Base
  before_action :store_user_location!, if: :storable_location?
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    def storable_location?
      request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
    end

    def store_user_location!
      store_location_for(:user, request.fullpath)
    end

    # To redirect to the stored location after the user signs in you would override the after_sign_in_path_for method:
    def after_sign_in_path_for(resource_or_scope)
      stored_location_for(resource_or_scope) || super
    end

    def configure_permitted_parameters
      added_attrs = [:username, :email, :password, :password_confirmation, :balance, :monthly_contribution, :remember_me]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end
end
