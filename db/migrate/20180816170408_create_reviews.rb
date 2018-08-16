class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.text :body, null: false

      t.timestamps null: false
      t.belongs_to :user, null: false
      t.belongs_to :stock, null: false
    end
  end
end
