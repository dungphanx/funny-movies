# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  before_save { self.email = email.downcase }

  has_many :movies, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }
end
