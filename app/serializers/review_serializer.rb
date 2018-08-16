class ReviewSerializer < ActiveModel::Serializer
  attributes :id,
  :body,
  :user,
  :created_at

  def user
    UserSerializer.new(object.user)
  end
end
