# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe 'validations' do
    let(:valid_link) { 'https://www.youtube.com/watch?v=12345678901' }

    it { is_expected.to validate_presence_of(:link) }
    it { is_expected.to allow_value(valid_link).for(:link) }
    it { is_expected.to_not allow_value('http://example.com').for(:link) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end
