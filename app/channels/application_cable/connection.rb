# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token]
      user_id = Auth.decode(token)['user_id']

      # Find the user based on the user_id
      User.find_by(id: user_id)
    rescue JWT::DecodeError
      reject_unauthorized_connection
    end
  end
end
