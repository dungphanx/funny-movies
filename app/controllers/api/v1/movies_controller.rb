# frozen_string_literal: true

module Api
  module V1
    class MoviesController < ApplicationController
      skip_before_action :authenticate_user, only: [:index]

      def index
        @movies = Movie.includes(:user).order(created_at: :desc)
        render json: { data: @movies.as_json(include: { user: { only: :email } }) }
      end

      def create
        @movie = current_user.movies.new(movie_params)

        if @movie.save
          render json: @movie.as_json(include: { user: { only: :email } })
        else
          render json: { error: @movie.errors, status: :unprocessable_entity }
        end
      end

      private

      def movie_params
        params.require(:movie).permit(:url)
      end
    end
  end
end
