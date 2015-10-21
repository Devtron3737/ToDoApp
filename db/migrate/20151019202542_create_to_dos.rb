class CreateToDos < ActiveRecord::Migration
  def change
    create_table :to_dos do |t|
      t.string :title, presence: true
      t.text :body, presence: true
      t.boolean :done, presence: true, default: false

      t.timestamp
    end
  end
end
