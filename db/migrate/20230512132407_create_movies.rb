# frozen_string_literal: true

class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :link
      t.string :title
      t.text :description
      t.string :uid
      t.integer :like
      t.integer :dislike
      t.references :user

      t.timestamps
    end
  end
end
