class CreateFriends < ActiveRecord::Migration[5.0]
  def change
    create_table :friends do |t|
      t.string :firstname
      t.string :lastname
      t.string :image
      t.string :lastMsg

      t.timestamps
    end
  end
end
