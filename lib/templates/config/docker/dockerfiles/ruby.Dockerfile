FROM ruby:3.0

WORKDIR /usr/src/app

COPY Gemfile ./

RUN bundle install

COPY . .

CMD ["./main.rb"]
