# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'with valid credentials' do
      let(:user) { create(:user, email: 'test@example.com', password: 'password') }

      before do
        post :create, params: { user: { email: user.email, password: 'password' } }
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns a valid token' do
        expect(JSON.parse(response.body)).to include('token')
      end
    end

    context 'with invalid credentials' do
      before do
        create(:user, email: 'test@example.com')
        post :create, params: { user: { email: 'test@example.com', password: 'wrongpassword' } }
      end

      it 'returns a 401 unauthorized response' do
        expect(response.status).to eq(401)
      end

      it 'returns an error message' do
        expect(JSON.parse(response.body)).to include('error')
      end
    end

    context 'when creating a new user' do
      before do
        post :create, params: { user: { email: 'newuser@example.com', password: 'password' } }
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns a valid token' do
        expect(JSON.parse(response.body)).to include('token')
      end
    end
  end
end
