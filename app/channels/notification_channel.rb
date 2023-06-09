class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notification_channel"
    stream_for current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
