class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :name
      t.text :mail
      t.text :direccion
      t.text :telefono

      t.timestamps
    end
  end
end
