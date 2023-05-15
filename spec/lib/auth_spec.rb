# frozen_string_literal: true

require 'auth'

RSpec.describe Auth do
  let(:payload) { { 'user_id' => 1 } }
  let(:token) { Auth.issue(payload) }

  before do
    allow(Auth).to receive(:auth_secret).and_return('YOUR_SECRET_KEY')
  end

  describe '.issue' do
    it 'returns a valid JWT token' do
      expect(token).to be_a(String)
      expect(token).not_to be_empty
    end
  end

  describe '.decode' do
    it 'returns the decoded payload from a JWT token' do
      decoded_payload = Auth.decode(token)
      expect(decoded_payload).to eq(payload)
    end
  end

  describe '.auth_secret' do
    it 'returns the JWT secret key from the environment variable' do
      expect(Auth.auth_secret).to eq('YOUR_SECRET_KEY')
    end
  end
end