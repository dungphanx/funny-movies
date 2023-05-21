# frozen_string_literal: true

module Api
  module V1
    class MoviesController < ApplicationController
      skip_before_action :authenticate_user, only: [:index]

      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 10
        movies = Movie.includes(:user).order(created_at: :desc).page(page).per(per_page)
        render json: { data: movies.as_json(include: { user: { only: :email } }) }
      end

      def create
        movie = current_user.movies.new(movie_params)

        if movie.save
          # Can move to background job
          ActionCable.server.broadcast 'notification_channel', movie.as_json(include: { user: { only: :email } })
          render json: movie.as_json(include: { user: { only: :email } })
        else
          render json: { error: movie.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def movie_params
        params.require(:movie).permit(:link)
      end
    end
  end
end
