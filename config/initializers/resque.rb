require 'resque/server'

if Rails.env.production?
  uri = URI.parse(ENV["REDIS_URL"])
  Resque.redis = Redis.new(url: ENV["REDIS_URL"], port: uri.port, password: uri.password)
else
  Resque.redis = Redis.new(host: 'localhost', port: 6379)
end