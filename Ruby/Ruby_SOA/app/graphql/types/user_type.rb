module Types
    class UserType < BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :mail, String, null: false
      field :direccion, String, null: false
      field :telefono, Int, null:false
      #name:"dago", mail:"mail", direccion:"dir", telefono:"tel"
    end
  end