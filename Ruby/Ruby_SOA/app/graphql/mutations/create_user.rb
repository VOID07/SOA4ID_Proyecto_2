module Mutations
    class CreateUser < BaseMutation
        #name:"dago", mail:"mail", direccion:"dir", telefono:"tel"
      # arguments passed to the `resolved` method
      argument :name, String, required: true
      argument :mail, String, required: true
      argument :direccion, String, required: true
      argument :telefono, Int, required: true
  
      # return type from the mutation
      type Types::UserType
  
      def resolve(name: nil, mail: nil,direccion: nil, telefono: nil)
        User.create!(
          name: name,
          mail: mail,
          direccion: direccion,
          telefono: telefono,
        ) 
      end
    end
  end