# frozen_string_literal: true

FactoryBot.define do
  factory :movie do
    link { 'https://www.youtube.com/watch?v=12345678901' }
    title { 'Title' }
    description { 'MyText' }
  end
end
