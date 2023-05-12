# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user

  def authenticate_user
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base)
        @current_user = User.find(payload[0]['user_id'])
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization header missing' }, status: :unauthorized
    end
  end

  attr_reader :current_user
end
