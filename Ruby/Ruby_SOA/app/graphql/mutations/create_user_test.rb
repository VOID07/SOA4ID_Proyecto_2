require 'test_helper'

class Mutations::CreateUserTest < ActiveSupport::TestCase
  def perform(user: nil, **args)
    Mutations::CreateUser.new(object: nil, context: {}).resolve(args)
  end

  test 'create a new user' do
    user = perform(
        nombre: 'testName',
        mail: 'test mail',
        direccion: 'test dir',
        telefono: 85208522
    )

    assert user.persisted?
    assert_equal user.telefono, 85208522
    assert_equal user.mail, 'test mail'
    assert_equal user.nombre, 'testName'
    assert_equal user.direccion, 'test dir'
  end
end