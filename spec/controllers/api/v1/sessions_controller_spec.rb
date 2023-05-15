# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'when user login with valid credentials' do
      let(:user) { create(:user, email: 'user@example.com', password: 'password') }

      it 'returns a valid JWT token' do
        post :create, params: { email: user.email, password: 'password' }
        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        expect(json_response['token']).to be_present
      end
    end

    context 'when user signs up with valid credentials' do
      it 'returns a valid JWT token' do
        post :create, params: { email: 'newuser@example.com', password: 'password' }
        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        expect(json_response['token']).to be_present
      end
    end

    context 'when user provides existed email with wrong password' do
      it 'returns an unauthorized error' do
        create(:user, email: 'user@example.com', password: 'password')
        post :create, params: { email: 'user@example.com', password: 'wrongpassword' }
        expect(response).to have_http_status(:unauthorized)

        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('Invalid email or password')
      end
    end
  end
end
