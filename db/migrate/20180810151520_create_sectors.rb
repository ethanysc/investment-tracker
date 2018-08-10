class CreateSectors < ActiveRecord::Migration[5.2]
  def change
    create_table :sectors do |t|
      t.string :sector, null: false
      t.timestamps null: false
    end
  end
end
