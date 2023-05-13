# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { described_class.new(email: 'user@example.com', password: '123123') }

    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without an email' do
      subject.email = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid with an invalid email' do
      subject.email = 'user'
      expect(subject).to_not be_valid
      expect(subject.errors[:email]).to include('is invalid')
    end

    it 'is not valid with a duplicate email' do
      described_class.create(email: 'user@example.com', password: '123123')

      expect(subject).to_not be_valid
      expect(subject.errors[:email]).to include('has already been taken')
    end

    it 'is not valid without a password' do
      subject.password = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:password]).to include("can't be blank")
    end
  end

  describe 'callbacks' do
    describe 'before_save' do
      let(:user) { create(:user, email: 'USER@EXAMPLE.COM') }

      it 'downcases the email attribute' do
        expect(user.email).to eq('user@example.com')
      end
    end
  end
end
