# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  controller do
    def index
      render plain: 'Hello World'
    end
  end

  describe '#authenticate_user' do
    context 'when the Authorization header is present' do
      let(:user) { create(:user) }
      let(:token) { JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base) }

      before do
        request.headers['Authorization'] = "Bearer #{token}"
        get :index
      end

      it 'should set the current user' do
        expect(assigns(:current_user)).to eq(user)
      end
    end

    context 'when the Authorization header is missing' do
      before do
        get :index
      end

      it 'should return an unauthorized error' do
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)).to eq({ 'error' => 'Authorization header missing' })
      end
    end

    context 'when an invalid token is provided' do
      before do
        request.headers['Authorization'] = 'Bearer invalid_token'
        get :index
      end

      it 'should return an unauthorized error' do
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)).to eq({ 'error' => 'Invalid token' })
      end
    end
  end
end
