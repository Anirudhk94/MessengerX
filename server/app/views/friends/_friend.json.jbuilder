json.extract! friend, :id, :firstname, :lastname, :image, :lastMsg, :created_at, :updated_at
json.url friend_url(friend, format: :json)