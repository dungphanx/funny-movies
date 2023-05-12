# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      # POST /api/v1/login
      def create
        user = User.find_by(email: user_params[:email])
        return create_new_user if user.blank?

        if user&.authenticate(user_params[:password])
          token = encode_token(user_id: user.id)
          render json: { token: }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      private

      def create_new_user
        user = User.new(user_params)
        if user.save
          token = encode_token(user_id: user.id)
          render json: { token: }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def user_params
        params.require(:user).permit(:email, :password)
      end

      def encode_token(payload)
        JWT.encode(payload, Rails.application.secrets.secret_key_base)
      end
    end
  end
end
