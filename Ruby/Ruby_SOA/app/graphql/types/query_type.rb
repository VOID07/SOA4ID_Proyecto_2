module Types
  class QueryType < Types::BaseObject
    
    field :all_users, [UserType], null: false
    
    # this method is invoked, when `all_link` fields is being resolved
    def all_users()
      User.all
    end
  end
end
