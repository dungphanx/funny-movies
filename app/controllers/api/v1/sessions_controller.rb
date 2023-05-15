# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      # POST /api/v1/login
      def create
        @user = User.find_by(email: user_params[:email]&.downcase)
        return process_sign_up if @user.blank?

        return render_login_success if @user&.authenticate(user_params[:password])
          
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end

      private

      def process_sign_up
        @user = User.new(user_params)
        if @user.save
          render_login_success
        else
          render json: { error: @user.errors.full_messages }, status: :unauthorized
        end
      end

      def user_params
        params.permit(:email, :password)
      end

      def render_login_success
        token = encode_token(user_id: @user.id)
        render json: { token: token }
      end

      def encode_token(payload)
        Auth.issue(payload)
      end
    end
  end
end
