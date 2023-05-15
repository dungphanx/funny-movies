# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::MoviesController, type: :controller do
  describe 'GET #index' do
    let!(:user) { create(:user) }
    let!(:movie) { create(:movie, user:) }

    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end

    it 'returns the list of movies in descending order of creation time' do
      get :index
      expect(assigns(:movies)).to eq(Movie.all.order(created_at: :desc))
    end

    it 'returns the serialized movie data in the response body' do
      get :index
      expect(JSON.parse(response.body)['data']).to eq(Movie.all.as_json(include: { user: { only: :email } }))
    end
  end

  # describe 'POST #create' do
  #   let!(:user) { create(:user) }
  #   let(:valid_attributes) { { movie: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } } }
  #   let(:invalid_attributes) { { movie: { url: '' } } }

  #   context 'when user is authenticated' do
  #     before do
  #       request.headers.merge!('Authorization' => "Bearer #{JwtService.encode(user_id: user.id)}")
  #     end

  #     context 'with valid attributes' do
  #       it 'creates a new movie record' do
  #         expect {
  #           post :create, params: valid_attributes
  #         }.to change(Movie, :count).by(1)
  #       end

  #       it 'returns the serialized movie data in the response body' do
  #         post :create, params: valid_attributes
  #         expect(JSON.parse(response.body)).to eq(Movie.last.as_json(include: { user: { only: :email } }))
  #       end
  #     end

  #     context 'with invalid attributes' do
  #       it 'does not create a new movie record' do
  #         expect {
  #           post :create, params: invalid_attributes
  #         }.not_to change(Movie, :count)
  #       end

  #       it 'returns the error messages in the response body' do
  #         post :create, params: invalid_attributes
  #         expect(JSON.parse(response.body)['error']).to be_present
  #       end
  #     end
  #   end

  #   context 'when user is not authenticated' do
  #     it 'returns an unauthorized response' do
  #       post :create, params: valid_attributes
  #       expect(response).to have_http_status(:unauthorized)
  #     end
  #   end
  # end
end
