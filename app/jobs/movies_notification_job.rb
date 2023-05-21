class MoviesNotificationJob < ApplicationJob
  queue_as :default

  def perform(movie_id)
    movie = Movie.find(movie_id)
    ActionCable.server.broadcast 'notification_channel', movie.as_json(include: { user: { only: :email } })
  end
end
