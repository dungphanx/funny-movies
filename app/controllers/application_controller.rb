# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user

  def authenticate_user
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      begin
        payload = Auth.decode(token)
        @current_user = User.find(payload['user_id'])
      rescue StandardError
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization header missing' }, status: :unauthorized
    end
  end

  attr_reader :current_user
end
