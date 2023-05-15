# frozen_string_literal: true

FactoryBot.define do
  factory :movie do
    link { "https://www.youtube.com/watch?v=#{SecureRandom.hex(3)}" }
    title { 'Title' }
    description { 'MyText' }

    association :user
  end
end
