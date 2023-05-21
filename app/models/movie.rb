# frozen_string_literal: true

class Movie < ApplicationRecord
  YT_LINK_FORMAT = %r{\A.*(youtu.be/|v/|u/\w/|embed/|watch\?v=|&v=)([^#&?]*).*\z}i

  before_validation :fetch_youtube_data, on: :create

  belongs_to :user

  validates :link, presence: true, format: { with: YT_LINK_FORMAT },
                   uniqueness: { case_sensitive: false }

  private

  def youtube_video
    @youtube_video ||= Yt::Video.new(id: link.match(YT_LINK_FORMAT)[2])
  end

  def fetch_youtube_data
    return if Rails.env.test?
    return if link.blank?

    begin
      if youtube_video.exists?
        self.uid = youtube_video.id
        self.title = youtube_video.title
        self.description = youtube_video.description
        self.like = youtube_video.like_count
        self.dislike = youtube_video.dislike_count
      end
    rescue Yt::Errors::NoItems
      errors.add(:link, 'is invalid or unavailable')
      false
    end
  end
end
