# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::MoviesController, type: :controller do
  describe 'GET #index' do
    it 'returns a list of movies' do
      user = create(:user)
      movies = create_list(:movie, 5, user: user)

      get :index

      expect(response).to have_http_status(:success)

      json_response = JSON.parse(response.body)
      expect(json_response['data']).to be_present
      expect(json_response['data'].length).to eq(5)
    end
  end

  describe 'POST #create' do
    context 'when user is authenticated' do
      let(:user) { create(:user) }
      let(:token) { Auth.issue({ 'user_id' => user.id }) }

      before { request.headers['Authorization'] = "Bearer #{token}" }

      context 'with valid parameters' do
        it 'creates a new movie' do
          movie_params = { link: "https://www.youtube.com/watch?v=#{SecureRandom.hex(3)}" }

          expect { post :create, params: { movie: movie_params } }.to change(Movie, :count).by(1)
          
          expect(response).to have_http_status(:success)

          json_response = JSON.parse(response.body)
          expect(json_response['user']['email']).to eq(user.email)
          expect(json_response['link']).to eq(movie_params[:link])
        end
      end

      context 'with invalid parameters' do
        it 'returns an error' do
          movie_params = { link: '' }

          expect {
            post :create, params: { movie: movie_params }
          }.to_not change(Movie, :count)

          expect(response).to have_http_status(:unprocessable_entity)

          json_response = JSON.parse(response.body)
          expect(json_response['error']).to be_present
        end
      end
    end

    context 'when user is not authenticated' do
      it 'returns an unauthorized error' do
        post :create, params: { movie: { link: 'https://www.example.com/movie' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
